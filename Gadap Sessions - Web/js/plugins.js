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

// $('.border').click(function() {
//         $('.border').css({
//             'background-color': 'white',
//             'color': 'black'
//          });
//     });
$(function(){
    $('.chura-index a').click(function(){
        $('.chura-index a.active').removeClass('active');
        $(this).addClass('active');
    });
});

$(function(){
    
    // $('.linkA').click(function(){
    //     $('.linkA.active').toggleClass('active');
    //     // $(this).addClass('active');
    // });
    // $('.linkB').click(function(){
    //     $('.linkB.active').removeClass('active');
    //     $(this).addClass('active');
    // });
    // $('.linkC').click(function(){
    //     $('.linkC.active').removeClass('active');
    //     $('.linkC').addClass('active');
    // });
    // $('.linkD').click(function(){
    //     $('.linkD-1.active').removeClass('active');
    //     $('.linkD-1').addClass('active');
    // });
    // $('.linkE').click(function(){
    //     $('.linkE-1.active').removeClass('active');
    //     $('.linkE-1').addClass('active');
    // });
    // $('.linkF').click(function(){
    //     $('.linkF-1.active').removeClass('active');
    //     $('.linkF-1').toggleClass('active');
    // });
    // $('.linkG').click(function(){
    //     $('.linkA-1.active').removeClass('active');
    //     $('.linkA-1').toggleClass('active');
    // });
});