$(function() {

	//kerouac emoji OTT//


	// (function() {
	// 	var template = '⌫❌❌⌘⛔⏳❌⌽⌽🐒⚫❌⌘🔍✨☠✊🐍 ✋📱🐇░✓░░✨⚫❌❌⌘⏏✊🐀✓♪'.split(''),
	// 		len = template.length,
	// 		chars, string, i, j, k,
	// 		pushOrHash = typeof window.history.pushState === 'function',
		
	// 	increase = function(n) {
	// 		return n < len - 1 ? n + 1 : 0;
	// 	},
		
	// 	update = function() {
	// 		chars = [];
	// 		j = k;
			
	// 		for (i=0; i<len; i++) {
	// 			j = increase(j);
	// 			chars[i] = template[j];
	// 		}
			
	// 		string = ['/', chars.join(''), '/'].join('');
	// 		k = increase(k);
			
	// 		if (pushOrHash) {
	// 			window.history.pushState(null, null, string);
	// 		} else {
	// 			window.document.location.hash = string;
	// 		}
			
	// 		setTimeout(update, 1000);
	// 	};
		
	// 	update();
	// })();

	$(function () {
	  $(".automatic p").each(function (i, elt) {
	    $(elt).css({
	      left: Math.random() * 1300,
	      top: Math.random() * 650
	    });
	  });
	});

	//Ondaatje sentence repeat//

	var str = "your voice sounds like your voice sounds your voice sounds like a".split(/\s/);

	var i = 0;
	var stop= setInterval(function() {
	    $('<span></span>').text(str[i]+' ').hide().appendTo('.ondaatje').fadeIn(100);  
	    i = (i + 1) % str.length;
	}, 30);

	setTimeout(function( ) { clearInterval( stop ); }, 90000);

	//Ondaatje Tooltip//

	$("img[title]:gt(1)").tooltip({
          // use div.tooltip as our tooltip
          tip: '.tooltip',
 
          // use the fade effect instead of the default
          effect: 'fade',
 
          // make fadeOutSpeed similar to the browser's default
          fadeOutSpeed: 100,
 
          // the time before the tooltip is shown
          predelay: 400,
 
          // tweak the position
          position: "bottom right",
          offset: [-50, -80]
      });


	//Click and reveal functin//

	// $(document).ready(function() {


	// function opening() {
	// 	$('a[data-opens]').click(function() {
			
	// 		var openedby = $(this).attr('data-opens');
	// 		$('[data-openedby="' + openedby +'"]').removeClass('off').addClass('on');
			
	// 		var closedby = $(this).attr('data-closes');
	// 		$('[data-closedby="' + closedby +'"]').css('display', 'none');
			
	// 		$(this).addClass('clicked');
			
	// 	});
	// }

});

