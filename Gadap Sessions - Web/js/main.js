$( function() {
  	$( ".draggable" ).draggable();
  	$( ".resizable" ).resizable({
      aspectRatio: true
    });

} );
$(document).ready(function(){
    $('.drag').on('mousedown', function(e){
        var $dragable = $(this).parent(),
            startWidth = $dragable.width(),
            pX = e.pageX;
        
        $(document).on('mouseup', function(e){
            $(document).off('mouseup').off('mousemove');
        });
        $(document).on('mousemove', function(me){
            var mx = (me.pageX - pX);
            //var my = (me.pageY - pY);
            
            $dragable.css({
                left: mx / 2,
                width: 1000 ,
                //top: my
            });
        });
                
    });
    $(".click1").click(function(){
    	$(".hide1").show();
    });
    $(".click2").click(function(){
    	$(".hide2").show();
	});
	$(".click3").click(function(){
    	$(".hide3").show();
    });
    $(".click4").click(function(){
    	$(".hide4").show();
    });
    $(".click5").click(function(){
    	$(".hide5").show();
    });
    $(".click6").click(function(){
    	// $(".shift-up").css({top: '20'+ px, position: 'fixed'});
    	$(".hide6").show();
    });
    $(".click7").click(function(){
    	$(".hide7").show();
    });
    $(".click8").click(function(){
    	$(".hide8").show();
    });
    $(".click9").click(function(){
    	$(".hide9").show();
    });
    $(".click10").click(function(){
    	$(".hide10").show();
    });
    $(".click11").click(function(){
    	$(".hide11").show();
    });


	var w = $(window),
	    b = $('#bkgd, #bkgd2');

	var fixbkgd = function(){
	    var x = w.width() + 'px ',
	        y = w.height() + 'px ';
	    b.css({
	        'border-width' : y + x
	    });
	}
	    
	w.resize(fixbkgd);
	fixbkgd();

    // $(document).ready(function() {
    //     if $('.video')css({
    //         opacity:1
    //     })
    //         $('.video').unmute
    // }

    // $( ".video" ).bind(
    //         "mouseover",
    //         function( event ){
    //             $('.hidden').addClass('visible');
    //         }
    // );
    // $( ".video" ).bind(
    //     "mouseout",
    //     function( event ){
    //         $('.hidden').removeClass('visible');
    //     }
    // );

     // $('.set-1').hover(function(){
     //      $('.vid-1').addClass('op');
     //      $("#set-1").fadeIn(0);
     //  },
     //  function(){
     //      $('.group, .curated, .text, .video, .other').removeClass('op');
     //      $("#solo").fadeOut(0);
     //  });



});