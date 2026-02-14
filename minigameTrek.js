var M={};
M.parent=Game.Objects['Shipment'];
M.parent.minigame=M;
M.launch=function()
{
	var M=this;
	M.name=M.parent.minigameName;
	M.init=function(div)
	{
		M.planets = {
			'earth':{
				name:'Earth',
				icon:[0,0],
				desc:'Your home planet. A blue and green sphere teeming with life.',
				min_distance:0,
			},
			'junction':{
				name:'Junction',
				icon:[0,0],
				desc:'Many paths converge here. Choose your next destination wisely.',
				parents:['earth','cookie','bio','asteroid field','molten','frigid','gold cookie','alien ship','mystery'],
				min_distance:0,
			},
			'asteroid field':{
				name:'Asteroid Field',
				icon:[0,0],
				desc:'A dense field of asteroids. Navigating through here will be tricky, but you can always blast your way through.',
				parents:['cookie','bio','frigid','molten','junction',''],
				min_distance:2,
			},
			'cookie':{
				name:'Cookie Planet',
				icon:[0,0],
				desc:'A planet made entirely of cookies and fragrant dough. The air smells delicious here.',
				min_distance:6,
			},
			'gold cookie':{
				name:'Golden Cookie Planet',
				icon:[0,0],
				desc:'A rare planet, which shimmers golden to your eyes. You feel lucky just being near it.',
				min_distance:8,
			},
			'bio':{
				name:'Bio Planet',
				icon:[0,0],
				desc:'A lush, green world filled with strange flora and creatures. Your time is not to be spent here.',
				min_distance:5,
			},
			'frigid':{
				name:'Frigid Planet',
				icon:[0,0],
				desc:'A giant ice world, with temperatures so low that even light seems to freeze over. Staying here would not be advised.',
				min_distance:4,
			},
			'molten':{
				name:'Molten Planet',
				icon:[0,0],
				desc:'A fiery world of lava and ash, where the ground is constantly shifting, and your spaceship melts slowly. Staying here would not be advised.',
				min_distance:4,
			},
			'alien ship':{
				name:'Alien Ship',
				icon:[0,0],
				desc:'A dangerous, and quite frankly, hostile alien vessel. Fight your way through it to claim its treasures.',
				min_distance:4,
			},
			'alien fleet':{
				name:'Alien Fleet',
				icon:[0,0],
				desc:'The whole fleet is here, and armed to the teeth. Avoid at all costs.',
				min_distance:6,
			},
			'mystery':{
				name:'Mysterious Planet',
				icon:[0,0],
				desc:'A planet shrouded in mystery, its surface obscured by thick clouds. Who knows what lies on this tiny world?',
				min_distance:8,
			},
		};

		M.thrusters = {
			'basic':{
				name:'Basic Thrusters',
				desc:'Standard propulsion system. Reliable but not very fast.',
				speed:1,
				fuel:5,
			},
			'hyperdrive':{
				name:'Hyperdrive',
				desc:'This thruster is blazing fast. You will have no trouble getting places in time, however uses a lot of fuel.',
				speed:2,
				fuel:8,
			},
			'atomic':{
				name:'Atomic Exhaust',
				desc:'Extremely fuel efficient, but not very fast.',
				speed:0.35,
				fuel:2,
			},
		};
		M.weapons = {
			'proton blaster':{
				name:'Proton Blaster',
				desc:'Standard ship weapon. Effective against most threats.',
				power:5,
				fuel:2,
				accuracy:0.75,
			},
			'laser sniper':{
				name:'Laser Sniper',
				desc:'High powered, and perfectly accurate, but uses a lot of fuel.',
				power:7,
				fuel:8,
				accuracy:1,
			},
			'railgun':{
				name:'Railgun',
				desc:'Ultimate power. Deals wicked damage and good accuracy, but uses most of your fuel',
				power:20,
				fuel:0.1,
				accuracy:0.85,
			},
			'minigun burst':{
				name:'Minigun Burst',
				desc:'Fires a rapid burst of shots. Much Less power and accuracy, but uses almost no fuel.',
				power:2,
				fuel:0.5,
				accuracy:0.65,
			}
		};
		M.gadgets = {
			'claw':{
				name:'Claw',
				desc:'An epic mechanical claw. Loading time is halved',
			},
			'mega tank':{
				name:'Mega Tank',
				desc:'A massive fuel tank. Fuel capacity is increased by 30%',
			},
			'energizer':{
				name:'Energizer',
				desc:'Uses radiation to overclock your ship systems. Weapon damage increased by 30%',
			},
			'plow':{
				name:'Plow',
				desc:'A reinforced ship front that plows through obstacles. Able to plow through asteroids with taking minimal damage.',
			},
		};
		M.currentSetup="0000"; //thruster, weapon 1 and 2, and gadget, in order
		M.currentPlanet='earth';
		M.armor = 100;
		M.fuel = 100;
		M.maxFuel = 100;
		M.distanceTraveled = 0;

		M.map = [];
		M.links = [];
		M.distance=function(x1,y1,x2,y2){
			return Math.sqrt((x1-x2)^2+(y1-y2)^2);
		}
		M.relaxNodes=function(iterations,minDistance){
			let unlinkedForce = 0.05;
			let linkedForce = 0.05;
			let targetDistance = minDistance;
			for (var iter=0;iter<iterations;iter++){
				for (var i=0;i<M.map.length();i++){
					for (var ii=i+1;ii<M.map.length();ii++){
						let node1 = M.map[i];
						let node2 = M.map[ii];
						let distance = M.distance(node1.x,node1.y,node2.x,node2.y);
						if (distance < targetDistance && distance>0){
							let nx = (node2.x-node1.x)/distance;
							let ny = (node2.y-node1.y)/distance;

							let force = unlinkedForce * (targetDistance - distance);
							let force1 = force * (node1.parent?0.5:1); // Parent node = Less affected
							let force2 = force * (node2.parent?0.5:1);
							node1.x += nx * force1;
							node1.y += ny * force1;
							node2.x -= nx * force2;
							node2.y -= ny * force2;
						}
					}
				}
				for (var link of M.links){
					let node1 = M.map[link.from];
					let node2 = M.map[link.to];
					let distance = M.distance(node1.x,node1.y,node2.x,node2.y);
					if (distance > 0){
						let nx = (node2.x-node1.x)/distance;
						let ny = (node2.y-node1.y)/distance;

						let force = linkedForce * (distance - targetDistance);
						let force1 = force * (node1.parent?0.5:1); // Parent node = Less affected
						let force2 = force * (node2.parent?0.5:1);
						node1.x -= nx * force1;
						node1.y -= ny * force1;
						node2.x += nx * force2;
						node2.y += ny * force2;
					}
				}
			}
		}
		M.newMap=function(segementCount){
			M.map = [];
			M.links = [];
			let minDistance = 50;
			let branchChance = 0.5;
			let maxBranches = 3;

			//generate a new map
			/*
			This was very difficult to code, so here's an explanation of how it works:
			1. Create a number of segements (nodes) equal to segementCount
			2. The first segement is always earth, the rest are random nodes
			3. Each segement (except the first) is linked to the previous segement
			4. Then, for each segement, check the distance to every other segement. If they are close enough, link them.
			*/
			for (var i=0;i<segementCount;i++){
				//choose a random planet
				let type = 'junction'; //default type
				let x = Math.random()*60-30;  //offset from center. Looks visually better!
				let y = Math.random()*60-30;
				if (i==0){
					type='earth';
					x,y = 0;
				}else{
					let options = object.keys(M.planets[M.map[i-1]].parents);
					for (var o in options){
						let option = M.planets[o];
						if (i<M.planets[option].min_distance) options.splice(option,1); //min distance
					};
					//The type chosen is simple. It just picks a random option from the list of possible parents, and removes options that are too close (min_distance)

					type = choose(options);
					links.push({from:i-1,to:i});
				}
				M.map.push({type:type,x:x,y:y,visited:false,parent:true});
			}
			//Branching nodes
			for (var i=1;i<M.map.length();i++){
				let parentNode = M.map[i];
				if (Math.random()<branchChance){
					let branches = Math.floor(Math.random()*maxBranches)+1;
					for (var b=0;b<branches;b++){
						let options = object.keys(M.planets[M.map[i-1]].parents);
						for (var o in options){
							let option = M.planets[o];
							if (i<M.planets[option].min_distance) options.splice(option,1); //min distance
						};
					
						type = choose(options);
						M.map.push({type:type,x:parentNode.x + Math.random()*2 - 1,y:parentNode.y+Math.random()*2 - 1,visited:false,parent:false});
						links.push({from:M.map.length(),to:i});
					
						
					}
				}
			}
			M.relaxNodes(150,minDistance);
			// Link close nodes
			for (var i; i<M.map.length();i++){
				for (var ii=0; ii<M.map.length();ii++){
					let node1 = M.map[i];
					let node2 = M.map[ii];
					if (i!=ii && Math.random()<0.7 && M.distance(node1.x,node1.y,node2.x,node2.y)<minDistance && !links.some(l=> (l.from==i && l.to==ii) || (l.from==ii && l.to==i))){
						links.push({from:i,to:ii});
					}
				}
			}
			M.relaxNodes(50,minDistance);

		};

		var str='';
		str+='<style>'+
		'#trekBG{background:url('+Game.resPath+'img/shadedBorders.png),url('+Game.resPath+'img/BGgalactic.png);background-size:100% 100%,auto;position:absolute;left:0px;right:0px;top:0px;bottom:16px;}'+
		'#trekContent{position:relative;box-sizing:border-box;padding:4px 24px;text-align:center;}'+

		'</style>';
		str+='<div id="trekBG"></div>';
		str+='<div id="trekContent">';
		
		str+='</div>';
		div.innerHTML=str;
		M.newMap(10);
    }
	M.logic=function()
	{
		//run each frame
	}

	M.draw=function()
	{
		//run each draw frame
		
	}
	M.init(l('rowSpecial'+M.parent.id));

}