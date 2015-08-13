$(function() {
	

	$('#nav-trigger').click(function(){
		
        $('#gradient').fadeOut('slow', function() {
        	$('#nav').fadeIn('slow');
        	});
    });

    $('#nav-trigger').click(function(event) {
       // alert();
         if($('#nav').hasClass("hide"))
        {
           // alert();
        $('#gradient').fadeOut('slow', function() {
 			$('#nav').removeClass('hide');
        	$('#nav').fadeIn('slow');
        	});
          
        } else {
            
            //alert('no class');
        $('#gradient').fadeIn('slow', function() {
        	$('#nav').fadeOut('slow');
        	});
        }

    });
    // $('#nav-trigger').click(function(event) {
    //    // alert();
    //      if($('#nav').hasClass("show"))
    //     {
    //        // alert();
    //     $('#nav').fadeIn(100, function() {
    //  		$('#gradient').fadeOut('slow');
 			// $('#nav').removeClass('hide');
    //     });
          
    //     } else {
            
    //         //alert('no class');
    //     $('#nav-trigger').click(function() { 
    //        $('#nav').addClass('hide'); 
    //     });
    //     }

    // });
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
