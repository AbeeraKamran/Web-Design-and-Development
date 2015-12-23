/*! Zak Group Boilerplate ~ http://zakgroup.co.uk/ ~ Rupert Dunk */

(function($) {
	$.fn.closestToOffset = function(offset) {
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

	// function initializeMaps() {
	// 	var mapStyle = [{"elementType": "geometry", "stylers": [{ "visibility": "simplified" }, { "saturation": -100 }, { "gamma": 1.6 } ] },{"elementType": "labels", "stylers": [{"saturation": -100}]},{"featureType": "water", "stylers": [{ "gamma": 3}, { "hue": "#ffffff" } ] }];var mapStyle = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"off"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{ "visibility": "simplified" },{"gamma": 1.6},{"saturation":-97}]}];
	// 	$('.map').each(function(){
	// 		var data = $(this).data('map');
	// 		if (data){
	// 			var InitLatlng = new google.maps.LatLng(data[0].marker.lat, data[0].marker.lng);
	// 			var mapOptions = {center: InitLatlng, zoomControl: 1, zoom: 15 };
	// 			var map = new google.maps.Map(document.getElementById($(this).attr('id')), mapOptions);
	// 			map.markers = [];
	// 			for (var key in data) {
	// 				if (data.hasOwnProperty(key)) {
	// 					var obj = data[key];
	// 					var Latlng = new google.maps.LatLng(obj.marker.lat, obj.marker.lng);
	// 					var marker = new google.maps.Marker({ title: obj.title, animation: google.maps.Animation.DROP, position: Latlng,map: map, icon: 'img/marker.png' });
	// 					map.markers.push(marker);
	// 					var contentString = '<div class="map-marker"><h3>'+obj.title+'</h3><p>'+obj.marker.address+'</p></div>';
	// 					var infowindow = new google.maps.InfoWindow({ content: obj.title });
	// 					google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
	// 						return function() {
	// 							infowindow.setContent(content);
	// 							infowindow.open(map,marker);
	// 						};
	// 					})(marker,contentString,infowindow));
	// 					google.maps.event.addListener(map, 'click', (function(marker,content,infowindow) {
	// 						return function() {
	// 						infowindow.close(map,marker);
	// 						};
	// 					})(marker,contentString,infowindow));
	// 					infowindow.setContent(contentString);
	// 					infowindow.open(map,marker);
	// 				}
	// 			}
	// 			map.set('styles', mapStyle);
	// 			map.setOptions({'scrollwheel': false});
	// 			var bounds = new google.maps.LatLngBounds();
	// 			$.each(map.markers, function(i, marker){
	// 				var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
	// 				bounds.extend(latlng);
	// 			});
	// 			if( map.markers.length == 1 ) {
	// 				map.setCenter( bounds.getCenter() );
	// 			} else {
	// 				map.fitBounds(bounds);
	// 			}
	// 		} else {
	// 			$(this).remove();
	// 		}
	// 	});
	// }

	$.fn.positionPoints = function() {
		$overlay = $(this);
		$('.point').each(function(){
		    $point = $(this);
		    $point.addClass("visible");
			var divWidth = $point.width();
			var posx = ($point.data('x')/100 * ($overlay.width() - divWidth/2));
		    var posy = ($point.data('y')/100 * ($overlay.height() - divWidth/2));
		    $point.css({"top": posy, "left":posx});
		});
	}

	function doScroll() {
		var windowHeight = $(window).height();
		var scrollPos = $(document).scrollTop();
		var percent = scrollPos/((documentHeight)-windowHeight);
		var top = percent*(overlayHeight-windowHeight);
		if (percent > 1) {
			var pos = (overlayHeight-windowHeight);
			var excess = documentHeight-scrollPos;
			$('.overlay').css({"position":"fixed","top":-pos+excess-mapHeight });
		} else {
			$('.overlay').css({"position":"fixed","top":-top});
		}
	}


	var mapHeight;
	var overlayHeight;
	var $overlay;
	var documentHeight;

	$(window).scroll(function(){
		doScroll();
	});

	$(window).load(function(){
		$overlay = $('.overlay');
		$(window).resize(function(){
			mapHeight = $('footer').outerHeight();
			overlayHeight = $overlay.height();
			documentHeight = $(document).height()-mapHeight;
			$overlay.positionPoints();
			doScroll();
		}).resize();

		// initializeMaps();

		$('.point').hover(function(e){
			$point = $(this);
			var offset = $('.overlay').offset();
			var x = $point.offset().left + $point.width()/2;
			var y = $point.offset().top + $point.height()/2 - offset.top;
			var xp = x/$(window).width()*100;
			var yp = y/(overlayHeight)*100;
			$('.overlay-image').css({
		    	'transform-origin': xp+'% '+yp+'%',
		    	'-ms-transform-origin': xp+'% '+yp+'%',
		    	'-moz-transform-origin': xp+'% '+yp+'%',
		    	'-o-transform-origin': xp+'% '+yp+'%',
		    	'-webkit-transform-origin': xp+'% '+yp+'%'
		    });
			$('.overlay, .caption').addClass("visible");
			$('.caption').html($point.data('title'));


		}, function(){
			$('.overlay-image').removeClass('zoom');
			$('.overlay, .caption').removeClass("visible");

		});


		$('.point').click(function(e){
			if ($('.overlay-image').hasClass("zoom")) {
				$('.overlay-image').removeClass("zoom");
				$('.overlay, .caption').removeClass("visible");
			} else {
				$('.overlay-image').addClass('zoom');
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

		


		function nextSection() {
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
		        nextSection();
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
				var $elem = $('.point').closestToOffset({left:X , top:Y});
				$('.point').removeClass("highlight visible");
				$elem.addClass("highlight");
			});
		}, 1500);

	});

})(jQuery);
