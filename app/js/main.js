$(document).ready(function(){
	$(function(){
		resizedWindow();

		var scroll = $('.bg-content-two').offset().top;

		$('button[data="saibamais"]').on('click', function () {
			$("html, body").animate({ scrollTop: scroll }, 600);
				return false;
			});
	});

	$(window).resize(function() {
		resizedWindow();
	});

	function resizedWindow(){
		var hgScreen = window.innerHeight;
		var hg = (window.innerHeight - $('.content-one').height()) / 2;
		var hgEspec = ($('.camisa').height() - $('.especificacao').height()) / 2;
		var hgMobile = ($('.camisa').height() + $('.especificacao-mobile').height() + $('.especificacao').height());

		$('.especificacao').css({'margin-top': hgEspec + 'px'});	
		$('.hg-screen').css({'height': hgScreen + 'px'});
		$('.content-one').css({'margin-top' : hg + 'px'});		

		if (window.innerWidth <= 991){
			$('.especificacao').css({'margin-top' : ''});
			$('.content-one').css({'height': hgMobile + 'px', 'margin-top' : ''});
			$('.hg-screen').css({'height': ''});
		}	
	} 
});