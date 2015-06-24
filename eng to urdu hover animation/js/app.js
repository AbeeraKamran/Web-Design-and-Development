$(function() {

    $('#masonry').masonry({
      itemSelector: '.item',
      columnWidth: 400,
    });

    $('#masonry').masonry({ isFitWidth: true });

//	  var width = jQuery(document).width();
//	  var margin = (yourImageWidth-width)/-2;
//	  jQuery('#header').css('margin-left', (margin)+'px');


	var letters = document.querySelectorAll('.letter');

  var getTriggerParent = function(e) {
    var parent;

    if (!e.target.classList.contains('flex-item')) {
      parent = e.target;
    } else {
      parent = e.target.parentElement;
    }

    return parent;
  };

  var flipLetters = function(parent, first, second) {
    eng = parent.children[0];
    urdu = parent.children[1];

    urdu.classList.add(first);
    urdu.classList.remove(second);

    eng.classList.add(second);
    eng.classList.remove(first);
  };

  Array.prototype.slice.call(letters).forEach(function(letter) {
    letter.onmouseenter = function(e) {
      flipLetters(getTriggerParent(e), 'show', 'hidden');
    };

    letter.onmouseleave = function(e) {
      flipLetters(getTriggerParent(e), 'hidden', 'show');
    };
  });


	// $("#names li").hide();

   // $("li.eng").mouseover(function(){

   //   var letter = $(this).html();

   //   $("#urdu li").each(function(){

   //   var liText = $(this).text();


	// $('.eng').hover(function() {
	// 	$(this).closest('li').next('.urdu').stop(true).show();
	// 	// event.preventDefault();
	// 	// $(this).stop(false).hide();

	// }, function() {
	// 	$(this).closest('li').next('.urdu').stop(true).hide();
	// 	// event.preventDefault();
	// 	// $(this).show();

	// });

	$('#header').hide();

	$(window).bind('scroll', function() {
	    if ($(this).scrollTop() > 520) {
	        $('#header').fadeIn();
	    } else {
	        $('#header').stop().fadeOut("fast");
	    }
	});


  // $(window).scroll(function() {

  //   if ($(window).scrollTop() < 600) {
  //     $('#header').addClass('scrolled');
  //   } else {
  //     $('#header').removeClass('scrolled');
  //   };
  // });function openAll() {

  // $('.trigger').on('hover', function(e) {
  // 	var eng = $(this).children('.eng')
  // 	var urdu = $(this).children('.urdu');

  // 	if (eng.css('display') === 'block' && urdu.css('display') === 'none') {
  // 		eng.fadeOut(500);
  // 		urdu.fadeIn(500);
  // 	} else {
  // 		eng.fadeIn(500);s
  // 		urdu.fadeOut(500);
  // 	}
  // });

 //  $("#anything").circulate({

 //    speed: 400,
 //    height: 200,
 //    width: 200,
 //    sizeAdjustment: 100,
 //    loop: false,
 //    zIndexValues: [1, 1, 1, 1]

	// });


	 $("a").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(500, redirectPage);
    });

    function redirectPage() {
        window.location = linkLocation;
        $(".nav-page").fadeIn(500);//this is not working
    }


});







