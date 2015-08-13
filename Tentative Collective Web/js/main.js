$(function() {

	// var $clickme = $('.clickme'),
	//     $box = $('.box');

	// $box.hide();

	// $clickme.click( function(e) {
	//     $(this).text(($(this).text() === 'Hide' ? 'Show' : 'Hide')).next('.box').slideToggle();;
	//     e.preventDefault();
	// });
});

// 	// if($(window).width() > MQL) {
// 	// 	var headerHeight = $('.header').height();
// 	// 	$(window).on('scroll',
// 	// 	{
// 	//         previousTop: 0
// 	//     }, 
// 	//     function () {
// 	// 	    var currentTop = $(window).scrollTop();
// 	// 	    //check if user is scrolling up
// 	// 	    if (currentTop < this.previousTop ) {
// 	// 	    	//if scrolling up...
// 	// 	    	if (currentTop > 0 && $('.header').hasClass('is-fixed')) {
// 	// 	    		$('.header').addClass('is-visible');
// 	// 	    	} else {
// 	// 	    		$('.header').removeClass('is-visible is-fixed');
// 	// 	    	}
// 	// 	    } else {
// 	// 	    	//if scrolling down...
// 	// 	    	$('.header').removeClass('is-visible');
// 	// 	    	if( currentTop > headerHeight && !$('.header').hasClass('is-fixed')) $('.header').addClass('is-fixed');
// 	// 	    }
// 	// 	    this.previousTop = currentTop;
// 	// 	});
// 	// }

// 	$('.nav-trigger').on('click', function(){
// 		$('.menu-icon').toggleClass('is-clicked'); 
// 		$('.header').toggleClass('menu-is-open');


		
// 		//in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
// 		if( $('.primary-nav').hasClass('is-visible') ) {
// 			$('.primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
// 				$('body').removeClass('overflow-hidden');
// 			});
// 		} else {
// 			$('.primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
// 				$('body').addClass('overflow-hidden');
// 			});	
// 		}
// 	});
