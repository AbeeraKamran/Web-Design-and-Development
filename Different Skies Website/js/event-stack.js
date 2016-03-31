$(document).ready(function() {
    jQuery(function($) {
        var count = $('#event1 article').length,
            inc = 0,
            css = {
                left: function(index) {
                    var i = (index + inc) % count;
                    return i * 4;
                },
                top: function(index) {
                    var i = (index + inc) % count;
                    return i * 4;
                },
                zIndex: function(index) {
                    var i = (index + inc) % count;
                    return count-i;
                }
            };
    	    $('.e1').css(css).bind('click', function() {
    	        inc--;
    	        if (inc < 0) inc = count-1;
    	        $('.e1').css(css);
    	    }).bind('selectstart', function() {
    	        return false;
    	    });
    	});
    	//end of stack//

        jQuery(function($) {
        var count = $('#event2 article').length,
            inc = 0,
            css = {
                left: function(index) {
                    var i = (index + inc) % count;
                    return i * 4;
                },
                top: function(index) {
                    var i = (index + inc) % count;
                    return i * 4;
                },
                zIndex: function(index) {
                    var i = (index + inc) % count;
                    return count-i;
                }
            };
            $('.e2').css(css).bind('click', function() {
                inc--;
                if (inc < 0) inc = count-1;
                $('.e2').css(css);
            }).bind('selectstart', function() {
                return false;
            });
        });
        //end of stack//

        jQuery(function($) {
        var count = $('#event3 article').length,
            inc = 0,
            css = {
                left: function(index) {
                    var i = (index + inc) % count;
                    return i * 4;
                },
                top: function(index) {
                    var i = (index + inc) % count;
                    return i * 4;
                },
                zIndex: function(index) {
                    var i = (index + inc) % count;
                    return count-i;
                }
            };
            $('.e3').css(css).bind('click', function() {
                inc--;
                if (inc < 0) inc = count-1;
                $('.e3').css(css);
            }).bind('selectstart', function() {
                return false;
            });
        });
        //end of stack//
});