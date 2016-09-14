;(function(){

var base = 'http://115.28.228.4/798sys/';
var cfg = {
	// candle : base + 'content_down.jspx?contentId=578',
	// flower : base + 'content_up.jspx?contentId=578',
	// getNum : base + 'content_view.jspx?contentId=578',
	// addComment : base + 'comment.jspx',
	// getComment : base + 'comment.jspx?contentId=578',

	candle : 'static2/json/ok.json',
	flower : 'static2/json/ok.json',
	getNum : 'static2/json/num.json',
	addComment : 'static2/json/ok.json',
	getComment : 'static2/json/list.json',

	other : ''
};

//顶部区域高度
var topH = $( document.body ).width() / 1440 * 814;
$('.top').css({height : topH});

//滚动区域高度
var rollerH = $( document.body ).width() * 0.3 / 620 * 172;
$('.roller').css({height : rollerH});

//加载评论
$.get(cfg.getComment,function( data ){
	if( data.code != 200 ){
		console.log( data );
		return;
	}
	var html = '';
	$.each(data.content, function(i,n){
		html += '<li>'+ n +'</li>';
	});
	$('.roller-ul').html('').append( html );
	roll();
},'json');

//滚动
var timer = null;
function roll(){
	if( timer ) clearTimeout( timer );
	$('.roller-ul').children('li').css({marginTop : 0});
	var li0 = $('.roller-ul').children('li').eq( 0 );
	var rollerH = getRollerH();
	li0.css({marginTop : 20});
	timer = setInterval(function(){
		var mT = parseInt( li0.css('marginTop') );
		li0.css({marginTop : mT - 4});
		if( -mT >= rollerH ) roll();
	}, 600);
}
function getRollerH(){
	var h = 0;
	var lis = $('.roller-ul').children('li');
	for(var i = 0; i < lis.length; i++){
		h += lis.eq( i ).outerHeight( true );
	}
	return h - 50;
}

//献花点烛
$.get(cfg.getNum, function( data ){
	$('#flower-count').text( data[3] );
	$('#candle-count').text( data[4] );
}, 'json');
$('#flower').on('click', function(){
	$.get(cfg.flower, function( data ){
		console.log( data );
	});
	alert('献花成功');
	var count = $('#flower-count');
	var num = parseInt( count.text() );
	count.text( num + 1 );
});
$('#candle').on('click', function(){
	console.log(cfg.candle);
	$.get(cfg.candle, function( data ){
		console.log( data );
	});
	alert('点烛成功');
	var count = $('#candle-count');
	var num = parseInt( count.text() );
	count.text( num + 1 );
});

//留言弹框
var pop = $('.pop');
var area = $('.pop-area');
var popHide = function(){
	pop.addClass('hide');
	area.val('');
};
$('.cm-btn').on('click', function(){
	pop.removeClass('hide');
});
$('.pop-ok').on('click', function(){
	var val = $.trim( area.val() );
	if( !val ) return;
	var url = cfg.addComment;
	var param = {};
	param.contentId = 578;
	param.text = val;
	$.post(url, param, function( data ){
		console.log( data );
	}, 'json');
	alert('留言成功！');
	popHide();
	$('.roller-ul').prepend('<li>'+ val +'</li>');
	roll();
})
pop.on('click', function( e ){
	if( $(e.target).hasClass('pop') ){
		popHide();
	}
});

//背景音乐控制
var audio = $('#audio')[0];
var audioBtn = $('.music');
audioBtn.on('click', function(){
	if( !audioBtn.hasClass('mute') ){
		audioBtn.addClass('mute');
		audio.pause();
	}else{
		audioBtn.removeClass('mute');
		audio.play();
	}
});

//底部table控制
var nav = $('.nav');
var tab = $('.tab');
nav.on('click', function( e ){
	var self = $( e.currentTarget );
	if( self.hasClass('checked') ) return;
	nav.filter('.checked').removeClass('checked');
	tab.filter('.checked').removeClass('checked');
	var index = self.index();
	tab.eq( index ).addClass('checked');
	self.addClass('checked');
});

//按键绑定
$(document).keydown(function(e){ 
	if(e.keyCode == 13) $('.pop-ok').trigger('click');
	if(e.keyCode == 67) $('.cm-btn').trigger('click');
	// console.log(e.keyCode);	
}); 

var browser=navigator.appName 
var b_version=navigator.appVersion 
var version=b_version.split(";"); 
var trim_Version=version[1].replace(/[ ]/g,"");
var isIE = !!(browser == "Microsoft Internet Explorer");
var ie8 = !!(isIE && trim_Version == "MSIE8.0");
var ie7 = !!(isIE && trim_Version == "MSIE7.0");
var ie6 = !!(isIE && trim_Version == "MSIE6.0");
if( ie6 || ie7 || ie8 ){
	$('.tip').removeClass('hide');
}

})();