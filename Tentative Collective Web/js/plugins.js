// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

$(document).ready(function() {
    $(document).on('click tap touchstart', '.reveal-modal-bg', function() {
    return $('[data-reveal]').foundation('reveal', 'close');
}); 
    
    $("body").fitVids();

    // Initialize Masonry
    $('.grid').masonry({
        columnWidth: $grid.find('.grid-sizer')[0],
        itemSelector: '.grid-item',
        // isFitWidth: true,
        percentPosition: true,
        // gutter: 5,
        isAnimated: !Modernizr.csstransitions
    }).imagesLoaded(function() {
        $(this).masonry('reload');
    });
    


    // // Find all Vimeo videos
    // var $allVideos = $("iframe[src^='//player.vimeo.com']"),

    //     // The element that is fluid width
    //     $fluidEl = $(".grid-item");

    // // Figure out and save aspect ratio for each video
    // $allVideos.each(function() {

    //   $(this)
    //     .data('aspectRatio', this.height / this.width)

    //     // and remove the hard coded width/height
    //     .removeAttr('height')
    //     .removeAttr('width');

    // });

    // // When the window is resized
    // $(window).resize(function() {

    //   var newWidth = $fluidEl.width();

    //   // Resize all videos according to their own aspect ratio
    //   $allVideos.each(function() {

    //     var $el = $(this);
    //     $el
    //       .width(newWidth)
    //       .height(newWidth * $el.data('aspectRatio'));

    //   });

    // // Kick off one resize to fix all videos on page load
    // }).resize();

});
   


// Can also be used with $(document).ready()
 

 
  // function ready(player_id) {
  //   var froogaloop = $f(player_id);
  //   froogaloop.addEvent('play', function(data) {
  //     $('.flexslider').flexslider("pause");
  //   });
  //   froogaloop.addEvent('pause', function(data) {
  //     $('.flexslider').flexslider("play");
  //   });
  // }
 
 
  // // Call fitVid before FlexSlider initializes, so the proper initial height can be retrieved.
  // $(".flexslider")
  //   .fitVids()
  //   .flexslider({
  //     animation: "slide",
  //     useCSS: false,
  //     animationLoop: false,
  //     smoothHeight: true,
  //     before: function(slider){
  //       $f(player).api('pause');
  //     }
  // });

// Flexslider for images with thumbnail.
$(window).load(function() {
     

  $('#carousel1').flexslider({
    animation: "slide",
    directionNav: false,
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 190,
    minItems: 4,
    keyboard: true,
    touch: true,
    itemMargin: 5,
    asNavFor: '#slider1'
  });

  $('#slider1').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    keyboard: true,
    touch: true,
    sync: "#carousel1",
  });

 $('#carousel2').flexslider({
    animation: "slide",
    directionNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 190,
    minItems: 4,
    keyboard: true,
    touch: true,
    itemMargin: 5,
    asNavFor: '#slider2'
  });
  $('#slider2').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    keyboard: true,
    touch: true,
    sync: "#carousel2",
  });

   $('#carousel3').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 190,
    minItems: 4,
    keyboard: true,
    touch: true,
    itemMargin: 5,
    asNavFor: '#slider3'
  });
  $('#slider3').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    keyboard: true,
    touch: true,
    sync: "#carousel3",
  });

 $('#carousel4').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 190,
    minItems: 4,
    keyboard: true,
    touch: true,
    itemMargin: 5,
    asNavFor: '#slider4'
  });
  $('#slider4').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel4",
  });

  $('#carousel5').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 190,
    minItems: 4,
    keyboard: true,
    touch: true,
    itemMargin: 5,
    asNavFor: '#slider5'
  });
  $('#slider5').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel5",
  });
    
//  $('.reveal-modal').on('opened', function() {
//     $('#flex1').flexslider("setPosition", 0);
// });
// $('.flexslider-projections').flexslider({
//       animation: "slide"
//     });
// $(document).ready(function() {

//     $(".owl-carousel").owlCarousel({

//         navigation : true, // Show next and prev buttons
//         slideSpeed : 300,
//         paginationSpeed : 400,
//         singleItem:true

//         // "singleItem:true" is a shortcut for:
//         // items : 1, 
//         // itemsDesktop : false,
//         // itemsDesktopSmall : false,
//         // itemsTablet: false,
//         // itemsMobile : false
//     });
// });
});


function initFlexModal1() {
    $('#flex1').flexslider({
        animation: 'slide',
        animationLoop: true,
        itemMargin: 1,
        controlNav: true,
        directionNav: true,
        slideshow: true
    });
};
$('#firstModal').on('opened.fndtn.reveal', function () {
    initFlexModal1();
})

function initFlexModal2() {
    $('#flex2').flexslider({
        animation: 'slide',
        animationLoop: true,
        itemMargin: 1,
        controlNav: true,
        directionNav: false,
        slideshow: true
    });
};
$('#secondModal').on('opened.fndtn.reveal', function () {
    initFlexModal2();
})

function initFlexModal3() {
    $('#flex3').flexslider({
        animation: 'slide',
        animationLoop: true,
        itemMargin: 1,
        controlNav: true,
        directionNav: false,
        slideshow: true
    });
};
$('#thirdModal').on('opened.fndtn.reveal', function () {
    initFlexModal3();
})

function initFlexModal4() {
    $('#flex4').flexslider({
        animation: 'slide',
        animationLoop: true,
        itemMargin: 1,
        controlNav: true,
        directionNav: false,
        slideshow: true
    });
};
$('#fourthModal').on('opened.fndtn.reveal', function () {
    initFlexModal4();
})

function initFlexModal5() {
    $('#flex5').flexslider({
        animation: 'slide',
        animationLoop: true,
        itemMargin: 1,
        controlNav: true,
        directionNav: false,
        slideshow: true
    });
};
$('#fifthModal').on('opened.fndtn.reveal', function () {
    initFlexModal5();
})

function initFlexModal6() {
    $('#flex6').flexslider({
        animation: 'slide',
        animationLoop: true,
        itemMargin: 1,
        controlNav: true,
        directionNav: false,
        slideshow: true
    });
};
$('#sixthModal').on('opened.fndtn.reveal', function () {
    initFlexModal6();
})

function initFlexModal7() {
    $('#flex7').flexslider({
        animation: 'slide',
        animationLoop: true,
        itemMargin: 1,
        controlNav: true,
        directionNav: false,
        slideshow: true
    });
};
$('#seventhModal').on('opened.fndtn.reveal', function () {
    initFlexModal7();
})

function initFlexModal8() {
    $('#flex8').flexslider({
        animation: 'slide',
        animationLoop: true,
        itemMargin: 1,
        controlNav: true,
        directionNav: false,
        slideshow: true
    });
};
$('#eighthModal').on('opened.fndtn.reveal', function () {
    initFlexModal8();
})

function initFlexModal9() {
    $('#flex9').flexslider({
        animation: 'slide',
        animationLoop: true,
        itemMargin: 1,
        controlNav: true,
        directionNav: false,
        slideshow: true
    });
};
$('#ninthModal').on('opened.fndtn.reveal', function () {
    initFlexModal9();
})

function initFlexModal11() {
    $('#flex11').flexslider({
        animation: 'slide',
        animationLoop: true,
        itemMargin: 1,
        controlNav: true,
        directionNav: false,
        slideshow: true
    });
};
$('#eleventhModal').on('opened.fndtn.reveal', function () {
    initFlexModal11();
})


 