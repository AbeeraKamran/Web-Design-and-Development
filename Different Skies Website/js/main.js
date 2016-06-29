$(document).ready(function() {

	var toggleButton = document.getElementById('nav-trigger'),
	slide = document.querySelector('.menu-list'),
	thisTrigger = jQuery(this),
			thisMenu = thisTrigger.parent(),
			thisPanel = thisTrigger.next();

	toggleButton.addEventListener('click', toggleSlider, false);
	// toggleButton.addEventListener('touchend', toggleSlider, false);


	function toggleSlider(e) {
		e.stopPropagation();
	  if (slide.classList.contains('closed')) {
	    slide.classList.remove('closed');
	    $('.blue').css("background-color","white");;
	    $('body').addClass('overflow-hidden');

	  } else {
	    slide.classList.add('closed');
	    $('body').removeClass('overflow-hidden');
	    $('.blue').css("background-color","blue");;
	  }
	}

	jQuery(document).on('click', function() {
		slide.classList.add('closed');
	    $('body').removeClass('overflow-hidden');

	});
		$('#inner').hover(function(){
		$('.issue-index').css(visibility, visible);
	});

});

