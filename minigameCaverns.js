var M={};
M.parent=Game.Objects['Mine'];
M.parent.minigame=M;
M.launch=function()
{
	var M=this;
	M.name=M.parent.minigameName;
	M.init=function(div)
	{
		var str='';
		str+='<style>'+
		'#cavernBG{background:url('+Game.resPath+'img/shadedBorders.png),url('+Game.resPath+'img/BGcavern.png);background-size:100% 100%,auto;position:absolute;left:0px;right:0px;top:0px;bottom:16px;height:100px;overflow-y:scroll;}'+
		'#templeContent{position:relative;box-sizing:border-box;padding:4px 24px;text-align:center;}'+
		'.templeIcon{pointer-events:none;margin:12px 6px 0px 6px;width:48px;height:48px;opacity:0.8;position:relative;}'+
		

		
		
		'</style>';
		str+='<div id="cavernBG"></div>';
		str+='<div id="cavernContent">';
		str+='</div>';
		div.innerHTML=str;
    }
}