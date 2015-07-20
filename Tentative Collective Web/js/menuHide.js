$(function() {
	

	$('#nav-trigger').click(function(){
		
        $('#gradient').fadeOut('slow', function() {
        	$('#nav').fadeIn('slow');
        	});
    });
	// $(".nav-trigger").on('click', function() {
		// $("nav").toggleClass('hide');
		// $(".content").toggleClass('hide');
		// $(".footer").toggleClass('hide');
		// $(".overlay").toggleClass('hide');



 //    if($("nav").hasClass('hide')){
	// 	   $("nav").removeClass('hide').fadeIn( '1000' )
	// 	}else{
	// 	  $("nav").addClass('hide').fadeOut( '1000' )
	// 	}

	// 	if($(".content").hasClass('hide')){
	// 	   $(".content").removeClass('hide').fadeIn( '1000' )
	// 	}else{
	// 	  $(".content").addClass('hide').fadeOut( '1000' )
	// 	}
	// 	if($(".footer").hasClass('hide')){
	// 	   $(".footer").removeClass('hide').fadeIn( '1000' )
	// 	}else{
	// 	  $(".footer").addClass('hide').fadeOut( '1000' )
	// 	}

	// });
});
