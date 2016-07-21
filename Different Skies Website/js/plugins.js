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
/*
 * jQuery outside events - v1.1 - 3/16/2010
 * http://benalman.com/projects/jquery-outside-events-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

$(document).ready(function() {

    (function($,c,b){$.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "),function(d){a(d)});a("focusin","focus"+b);a("focusout","blur"+b);$.addOutsideEvent=a;function a(g,e){e=e||g+b;var d=$(),h=g+"."+e+"-special-event";$.event.special[e]={setup:function(){d=d.add(this);if(d.length===1){$(c).bind(h,f)}},teardown:function(){d=d.not(this);if(d.length===0){$(c).unbind(h)}},add:function(i){var j=i.handler;i.handler=function(l,k){l.target=k;j.apply(this,arguments)}}};function f(i){$(d).each(function(){var j=$(this);if(this!==i.target&&!j.has(i.target).length){j.triggerHandler(e,[i.target])}})}}})(jQuery,document,"outside");

    $(function(){
        if ($(window).width() >= 500) {
        $("#page-wrap").wrapInner("<table cellspacing='30'><tr>");
        $(".post").wrap("<td></td>");
        $("body").mousewheel(function(event, delta) {
            this.scrollLeft -= (delta * 30);
            this.scrollRight -= (delta * 30);
            event.preventDefault();
        });  
        } 
    });
});
// var isMobile = { 
// Android: function() { return navigator.userAgent.match(/Android/i); }, 
// BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); }, 
// iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, 
// Opera: function() { return navigator.userAgent.match(/Opera Mini/i); }, 
// Windows: function() { return navigator.userAgent.match(/IEMobile/i); }, 
// any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
// jQuery(function($) {
//     if (!isMobile.any())
//     $('.container').removeClass('post');
// });



