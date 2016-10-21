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
// function init() {
//     var video = $("video");   

//     video.onended = function(e) {

//         setTimeout(function() {
//             video.play();
//         }, 5000);
//         // code to navigate page
//         } 
// }

    // var video = $('video'); 
    // var loop = video.bind('ended', function (){ 
    //     this.play();
    // });
    // setInterval(loop, 2000);


/// Masonry Grid
    // var $grid = $('#masonry').masonry({
    // itemSelector: '.grid-item',
    // // columnWidth: function( containerWidth ) {
    // //     return containerWidth / 10;
    // // }
    // columnWidth:10,
    // gutter: 0
    // });

    // $('#masonry').masonry({ isFitWidth: true });

    // function masonry_init(){
    //     var container = document.querySelector('#masonry');
    //     var masonry = new Masonry(container, {
    //         itemSelector: '.grid-item',
    //         columnWidth: container.querySelector('.col_width')
    //     });
    // }
    // window.onload = masonry_init;

    // $grid.on( 'click', '.grid-item', function() {
    //   $(this).toggleClass('gigante');
    //   // trigger layout after item size changes
    //   $grid.masonry('layout');
    // });






