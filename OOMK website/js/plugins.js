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

// Place any jQuery/helper plugins in here.
$(document).ready(function() {

    $( ".manifesto-cell1" ).bind(
                "mouseover",
                function( event ){
                    $('.code-1').addClass('visible');
                }
        );
    $( ".manifesto-cell1" ).bind(
                "mouseout",
                function( event ){
                    $('.code-1').removeClass('visible');
                }
            );
    //--//
    $( ".manifesto-cell2" ).bind(
                "mouseover",
                function( event ){
                    $('.code-2').addClass('visible');
                }
        );
    $( ".manifesto-cell2" ).bind(
                "mouseout",
                function( event ){
                    $('.code-2').removeClass('visible');
                }
            );
    //--//

    $( ".manifesto-cell3" ).bind(
                "mouseover",
                function( event ){
                    $('.code-3').addClass('visible');
                }
        );
    $( ".manifesto-cell3" ).bind(
                "mouseout",
                function( event ){
                    $('.code-3').removeClass('visible');
                }
            );
    //--//

    $( ".manifesto-cell4" ).bind(
                "mouseover",
                function( event ){
                    $('.code-4').addClass('visible');
                }
        );
    $( ".manifesto-cell4" ).bind(
                "mouseout",
                function( event ){
                    $('.code-4').removeClass('visible');
                }
            );
    //--//

    $( ".manifesto-cell5" ).bind(
                "mouseover",
                function( event ){
                    $('.code-5').addClass('visible');
                }
        );
    $( ".manifesto-cell5" ).bind(
                "mouseout",
                function( event ){
                    $('.code-5').removeClass('visible');
                }
            );
    //--//

    $( ".manifesto-cell6" ).bind(
                "mouseover",
                function( event ){
                    $('.code-6').addClass('visible');
                }
        );
    $( ".manifesto-cell6" ).bind(
                "mouseout",
                function( event ){
                    $('.code-6').removeClass('visible');
                }
            );
    //--//

    $( ".manifesto-cell7" ).bind(
                "mouseover",
                function( event ){
                    $('.code-7').addClass('visible');
                }
        );
    $( ".manifesto-cell7" ).bind(
                "mouseout",
                function( event ){
                    $('.code-7').removeClass('visible');
                }
            );
    //--//

    $( ".manifesto-cell8" ).bind(
                "mouseover",
                function( event ){
                    $('.code-8').addClass('visible');
                }
        );
    $( ".manifesto-cell8" ).bind(
                "mouseout",
                function( event ){
                    $('.code-8').removeClass('visible');
                }
            );
    //--//

    $( ".manifesto-cell9" ).bind(
                "mouseover",
                function( event ){
                    $('.code-9').addClass('visible');
                }
        );
    $( ".manifesto-cell9" ).bind(
                "mouseout",
                function( event ){
                    $('.code-9').removeClass('visible');
                }
            );
    //--//

    $( ".manifesto-cell10" ).bind(
                "mouseover",
                function( event ){
                    $('.code-10').addClass('visible');
                }
        );
    $( ".manifesto-cell10" ).bind(
                "mouseout",
                function( event ){
                    $('.code-10').removeClass('visible');
                }
            );
    //--//

    $( ".manifesto-cell11" ).bind(
                "mouseover",
                function( event ){
                    $('.code-11').addClass('visible');
                }
        );
    $( ".manifesto-cell11" ).bind(
                "mouseout",
                function( event ){
                    $('.code-11').removeClass('visible');
                }
            );
    //--//

    $( ".manifesto-cell12" ).bind(
                "mouseover",
                function( event ){
                    $('.code-12').addClass('visible');
                }
        );
    $( ".manifesto-cell12" ).bind(
                "mouseout",
                function( event ){
                    $('.code-12').removeClass('visible');
                }
            );
});