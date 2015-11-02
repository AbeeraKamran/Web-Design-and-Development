$(function() {


	// $('body').hasClass('no-touch') ? event = 'mouseenter mouseleave' : event = 'click';
	// //!$('body').hasClass('no-touch') ? event = 'mouseenter mouseleave' : event = 'click';

	// $('.item').on(event, function() {
	//     $(this).find('p + p').toggleClass('open');
	// });

	$( ".box" ).click(function() {     
   $('.excerpt-overlay').toggle("slide", { direction: "right" }, 1000);	
	});

});