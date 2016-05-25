$(document).ready(function() {

	var toggleButton = document.getElementById('nav-trigger'),
	slide = document.querySelector('.menu-list'),
	thisTrigger = jQuery(this),
			thisMenu = thisTrigger.parent(),
			thisPanel = thisTrigger.next();

	toggleButton.addEventListener('click', toggleSlider, false);


	function toggleSlider(e) {
		e.stopPropagation();
	  if (slide.classList.contains('closed')) {
	    slide.classList.remove('closed');

	  } else {
	    slide.classList.add('closed');
	  }
	}

	jQuery(document).on("click", function() {
		slide.classList.add('closed');
	});


	spectrum();
		
		function spectrum(){
		var hue = 'rgb(' + (Math.floor(Math.random() * 255)) + ',' + (Math.floor(Math.random() * 0)) + ',' + (Math.floor(Math.random() * 255)) + ')';
			$('#inner').animate( { color: hue }, 150);
			spectrum(); 
	   	}

	// $(function() {
	
	// initDropDowns($(".menu-list"));

	// });

	// function initDropDowns(allMenus) {

	// 	allMenus("#nav-trigger").on("click", function() {
			
	// 		var thisTrigger = jQuery(this),
	// 			thisMenu = thisTrigger.parent(),
	// 			thisPanel = thisTrigger.next();

	// 		if (thisMenu.hasClass("open")) {

	//       		thisMenu.removeClass("open");
				
	//       		jQuery(document).off("click");                                 
	//       		thisPanel.off("click");

	// 		} else {			
				
	//     		allMenus.removeClass("open");	
	// 			thisMenu.addClass("open");
		
	// 			jQuery(document).on("click", function() {
	// 				allMenus.removeClass("open");
	// 			});
	// 			thisPanel.on("click", function(e) {
	// 				e.stopPropagation();
	// 			});
	// 		}
			
	// 		return false;
	// 	});
	// }
});

