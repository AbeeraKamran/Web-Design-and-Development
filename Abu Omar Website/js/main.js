
$(function() {

	// $("#nav-trigger").on('click', function() {
	// 	$("#nav").toggleClass('hide');
	// 	$("#gradient").toggleClass('hide');
	// 	$(".main").toggleClass('hide');
	// 	$("footer").toggleClass('hide');
 //    });


// 	var toggleButton = document.getElementById('nav-trigger'),
// 	slide = document.querySelector('.menu-list'),
// 	close= document.querySelector('.close');

// toggleButton.addEventListener('click', toggleSlider, false);

// // toggleButton.addEventListener('click', hideEye, false);

// 	function toggleSlider() {
// 	  if (slide.classList.contains('closed')) {
// 	    slide.classList.remove('closed');
// 	    $(".menu-text").text("Menu");
// 	  } else {
// 	    slide.classList.add('closed');
// 	    $(".menu-text").text("Close");

// 	  }
// 	}

//code for menu open close//
	$(".nav-trigger").click(function () {
	    $( '.hamburger__line' ).toggleClass( "hamburger__line-active" );
	    $( '.menu-list' ).toggleClass( "menu-list_height" );
	    $( '.main' ).toggleClass( "body--lock" );
	    $( '.flyer' ).toggleClass( "hide-it" );
	    $( '.menu-text' ).toggleClass( "hide-it" );

	    $('.menu-list .menu-item').each(function(i) {
	        var $menuItem = $(this);
	        window.setTimeout(function() {
	            $menuItem.toggleClass('menu-list_show');
	        }, 150 * i);
	    });
	});

//code for img shit on mobile//
	$('#pep').pep();

//code for img shit on reload//
	var wi = $(window).width();
	$(".shift").each(function (i, elt) {
		if (wi <= 1024){
		    $(elt).css({
		      left: Math.random() * 800,
		      top: Math.random() * 400
		    });
		}
		if (wi <= 768){
			$(elt).css({
		      left: Math.random() * 600,
		      top: Math.random() * 300
		    });
		}
		else {
			$(elt).css({
		      left: Math.random() * 1300,
		      top: Math.random() * 500
		    });
		}
  	});

	
});
