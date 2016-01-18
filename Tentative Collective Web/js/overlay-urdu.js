$(document).ready(function() {

(function($) {
	$.fn.closestToOffsetUrdu = function(offset) {
	    var el = null, elOffset, x = offset.left, y = offset.top, distance, dx, dy, minDistance;
	    this.each(function() {
	        elOffset = $(this).offset();

	        if (
	        (x >= elOffset.left)  && (x <= elOffset.right) &&
	        (y >= elOffset.top)   && (y <= elOffset.bottom)
	        ) {
	            el = $(this);
	            return false;
	        }

	        var offsets = [[elOffset.left, elOffset.top], [elOffset.right, elOffset.top], [elOffset.left, elOffset.bottom], [elOffset.right, elOffset.bottom]];
	        for (off in offsets) {
	            dx = offsets[off][0] - x;
	            dy = offsets[off][1] - y;
	            distance = Math.sqrt((dx*dx) + (dy*dy));
	            if (minDistance === undefined || distance < minDistance) {
	                minDistance = distance;
	                el = $(this);
	            }
	        }
	    });
	    return el;
	}

	$.fn.positionPointsUrdu = function() {
		$overlay = $(this);
		$('.point-urdu').each(function(){
		    $point = $(this);
		    $point.addClass("visible");
			var divWidth = $point.width();
			var posx = ($point.data('x')/100 * ($overlay.width() - divWidth/2));
		    var posy = ($point.data('y')/100 * ($overlay.height() - divWidth/2));
		    $point.css({"top": posy, "left":posx});
		});
	}

	function doScrollUrdu() {
		var windowHeight = $(window).height();
		var scrollPos = $(document).scrollTop();
		var percent = scrollPos/((documentHeight)-windowHeight);
		var top = percent*(overlayHeight-windowHeight);
		if (percent > 1) {
			var pos = (overlayHeight-windowHeight);
			var excess = documentHeight-scrollPos;
			$('.overlay-urdu').css({"position":"fixed","top":-pos+excess-mapHeight });
		} else {
			$('.overlay-urdu').css({"position":"fixed","top":-top});
		}
	}


	var mapHeight;
	var overlayHeight;
	var $overlay;
	var documentHeight;

	$(window).scroll(function(){
		doScrollUrdu();
	});

	$(window).load(function(){
		$overlay = $('.overlay-urdu');
		$(window).resize(function(){
			mapHeight = $('footer').outerHeight();
			overlayHeight = $overlay.height();
			documentHeight = $(document).height()-mapHeight;
			$overlay.positionPointsUrdu();
			doScrollUrdu();
		}).resize();

		// initializeMaps();

		$('.point-urdu').hover(function(e){
			$point = $(this);
			var offset = $('.overlay-urdu').offset();
			var x = $point.offset().left + $point.width()/2;
			var y = $point.offset().top + $point.height()/2 -offset.top;
			var xp = x/$(window).width()*100;
			var yp = y/(overlayHeight)*100;
			$('.overlay-image-urdu').css({
		    	'transform-origin': xp+'% '+yp+'%',
		    	'-ms-transform-origin': xp+'% '+yp+'%',
		    	'-moz-transform-origin': xp+'% '+yp+'%',
		    	'-o-transform-origin': xp+'% '+yp+'%',
		    	'-webkit-transform-origin': xp+'% '+yp+'%'
		    });
			$('.overlay-urdu, .caption-urdu').addClass("visible");
			$('.caption-urdu').html($point.data('title'));


		}, function(){
			$('.overlay-image-urdu').removeClass('zoom');
			$('.overlay-urdu, .caption-urdu').removeClass("visible");

		});


		$('.point-urdu').click(function(e){
			if ($('.overlay-image-urdu').hasClass("zoom")) {
				$('.overlay-image-urdu').removeClass("zoom");
				$('.overlay-urdu, .caption-urdu').removeClass("visible");
			} else {
				$('.overlay-image-urdu').addClass('zoom');
			}
		});


		$('a[href^="#"]').click(function(e){
			e.preventDefault();
			if ($(this).hasClass('cv')) {
				$('body').addClass("hide");
				var person = $(this).attr('href');
				$(person).addClass("active");
			} else {
				var target = $(this).attr('href');
				$('html, body').animate({
					scrollTop: $(target).offset().top
				}, 400);
			}
		});

		


		function nextSectionUrdu() {
			var pos = $(document).scrollTop();
			var end = $(document).height()-$(window).height();
			if (pos >= end-40) {
				$('html, body').stop().animate({
					scrollTop: 0
				}, 1500);
			} else {
				$('.scrollTo').each(function(i){
					var elempos = $(this).position().top-pos;
					if(elempos > 100) {
						var target = elempos+pos;
						if ($(this).hasClass('clearfix')) {
							target = elempos+pos-80;
						} 
						$('html, body').stop().animate({
							scrollTop: target
						}, 400);
						return false;
					}
				});
			}
		}


		//keypresses
		$(document).keydown(function(e) {
		    switch(e.which) {

		        case 38: // up
		        case 33: // page up
		        prevSection();
		        break;

		        case 40: // down
		        case 34: // page down
		        nextSectionUrdu();
		        break;

		        case 36: // home
		        $('body, html').stop().animate({
		        	scrollTop: 0
		        }, 400);
		        break;

		        case 35: // end
		        $('body, html').stop().animate({
		        	scrollTop: $(document).height()-$(window).height()
		        }, 400);
				break;

		        default: return; // exit this handler for other keys
		    }
		    e.preventDefault(); // prevent the default action (scroll / move caret)
		});


		setTimeout(function(){
			$(window).mousemove(function(e){
				var X = e.pageX;
				var Y = e.pageY;
				var $elem = $('.point-urdu').closestToOffsetUrdu({left:X , top:Y});
				$('.point-urdu').removeClass("highlight visible");
				$elem.addClass("highlight");
			});
		}, 1500);

	});

})(jQuery);
})
