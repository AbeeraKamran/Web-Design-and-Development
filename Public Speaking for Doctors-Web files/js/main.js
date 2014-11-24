// $( document ).ready(function() {

// 	var trigger = $(".menu-icon");
// 	var nav = $("nav");

// 	// hover on trigger - display half menu
// 	trigger.mouseover(function() {
// 		$("#nav").attr("style","overflow:visible");

// 	});

	

// });
$(document).ready(function(){
  $('.turn').click(function(){
    $('.cont-turn').toggleClass('flipped');
    return false;
  });
});