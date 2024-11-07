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
		'#cavernBG{background:url('+Game.resPath+'img/shadedBorders.png),url('+Game.resPath+'img/BGcavern.png);background-size:100% 100%,auto;position:absolute;left:0px;right:0px;top:0px;bottom:16px;}'+
		'#cavernContent{position:relative;box-sizing:border-box;padding:4px 24px;text-align:center;}'+

		
		
		'</style>';
		str+='<div id="cavernBG"></div>';
		str+='<div id="cavernContent">';
		str+='</div>';
		div.innerHTML=str;
    }
}