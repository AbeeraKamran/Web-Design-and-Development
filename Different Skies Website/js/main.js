
    
	
$(document).ready(function() {

	var toggleButton = document.getElementById('nav-trigger'),
	slide = document.querySelector('.menu-list'),
	thisTrigger = jQuery(this),
	thisMenu = thisTrigger.parent(),
	thisPanel = thisTrigger.next();
	randomText = jQuery(".random").get().sort(function(){ 
			return Math.round(Math.random())-0.3
		}).slice(0,3);

	toggleButton.addEventListener('click', toggleSlider, false);
	// randomText.addEventListener("hover", randomize);
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
	function randomize(o) {
    var randomText = jQuery(".random").get().sort(function(){ 
			return Math.round(Math.random())-0.2
		}).slice(0,2);
    	randomize(o);
    };
  //   $('#inner').hover(
		// randomize,
  //       function() {
  //           $(randomText).css("background","black");
  //           $('.issue-index').css("visibility", "visible");
  //       },
  //       function(){
  //   	$('.issue-index').css("visibility", "hidden");
  //   	$(randomText).css("background","none");
  //   });

	$('#inner').hover(function(){
		var randomText = jQuery(".random").get().sort(function(){ 
			return Math.round(Math.random())-0.3
		}).slice(0,3);
		$('.issue-index').css("visibility", "visible");
		$(randomText).css("background","black");

	},function(){
    	$('.issue-index').css("visibility", "hidden");
    	$('.random').css("background","none");
	});

	

	

    

// 	randomElements = jQuery("li").get().sort(function(){ 
//   return Math.round(Math.random())-0.5
// }).slice(0,5)

});

