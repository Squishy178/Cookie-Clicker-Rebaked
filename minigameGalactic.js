var M={};
M.parent=Game.Objects['Shipment'];
M.parent.minigame=M;
M.launch=function()
{var M=this;
	M.name=M.parent.minigameName;
	M.init=function(div){
   		var str='';
		str+='<style>'+
		'#galacticBG{background:url('+Game.resPath+'img/shadedBorders.png),url('+Game.resPath+'img/BGgalactic.jpg);background-size:100% 100%,auto;position:absolute;left:0px;right:0px;top:0px;bottom:16px;}'+
		'#galacticContent{position:relative;box-sizing:border-box;padding:4px 24px;}'+
		'#galacticBar{max-width:95%;margin:4px auto;height:16px;}'+
		'#galacticBarFull{transform:scale(1,2);transform-origin:50% 0;height:50%;}'+
		'#galacticBarText{transform:scale(1,0.8);width:100%;position:absolute;left:0px;top:0px;text-align:center;color:#fff;text-shadow:-1px 1px #000,0px 0px 4px #000,0px 0px 6px #000;margin-top:2px;}'+
		'.grimoireIcon{pointer-events:none;margin:2px 6px 0px 6px;width:48px;height:48px;opacity:0.8;position:relative;}'+
		'.grimoirePrice{pointer-events:none;}'+
		'.grimoireSpell{box-shadow:4px 4px 4px #000;cursor:pointer;position:relative;color:#f33;opacity:0.8;text-shadow:0px 0px 4px #000,0px 0px 6px #000;font-weight:bold;font-size:12px;display:inline-block;width:60px;height:74px;background:url('+Game.resPath+'img/spellBG.png);}'+
		'.grimoireSpell.ready{color:rgba(255,255,255,0.8);opacity:1;}'+
		'.grimoireSpell.ready:hover{color:#fff;}'+
		'.grimoireSpell:hover{box-shadow:6px 6px 6px 2px #000;z-index:1000000001;top:-1px;}'+
		'.grimoireSpell:active{top:1px;}'+
		'.grimoireSpell.ready .grimoireIcon{opacity:1;}'+
		'.grimoireSpell:hover{background-position:0px -74px;} .grimoireSpell:active{background-position:0px 74px;}'+
		'.grimoireSpell:nth-child(4n+1){background-position:-60px 0px;} .grimoireSpell:nth-child(4n+1):hover{background-position:-60px -74px;} .grimoireSpell:nth-child(4n+1):active{background-position:-60px 74px;}'+
		'.grimoireSpell:nth-child(4n+2){background-position:-120px 0px;} .grimoireSpell:nth-child(4n+2):hover{background-position:-120px -74px;} .grimoireSpell:nth-child(4n+2):active{background-position:-120px 74px;}'+
		'.grimoireSpell:nth-child(4n+3){background-position:-180px 0px;} .grimoireSpell:nth-child(4n+3):hover{background-position:-180px -74px;} .grimoireSpell:nth-child(4n+3):active{background-position:-180px 74px;}'+
		
		'.grimoireSpell:hover .grimoireIcon{top:-1px;}'+
		'.grimoireSpell.ready:hover .grimoireIcon{animation-name:bounce;animation-iteration-count:infinite;animation-duration:0.8s;}'+
		'.noFancy .grimoireSpell.ready:hover .grimoireIcon{animation:none;}'+
		
		'#grimoireInfo{text-align:center;font-size:11px;margin-top:12px;color:rgba(255,255,255,0.75);text-shadow:-1px 1px 0px #000;}'+
		'</style>'; 
	M.dragonBoostTooltip=function()
		{
				return '<div style="width:280px;padding:8px;text-align:center;" id="tooltipDragonBoost"><b>'+loc("Supreme Intellect")+'</b><div class="line"></div>'+loc("Test! If this works that is fire bro",10*Game.auraMult('Supreme Intellect'))+'</div>';
		}
  }
}
