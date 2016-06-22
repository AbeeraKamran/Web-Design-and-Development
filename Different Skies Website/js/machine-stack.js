$(document).ready(function() {
    jQuery(function($) {
        var count = $('#machine1 article').length,
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
    	    $('.m1').css(css).bind('click', function() {
    	        inc--;
    	        if (inc < 0) inc = count-1;
    	        $('.m1').css(css);
    	    }).bind('selectstart', function() {
    	        return false;
    	    });
    	});
    	//end of stack//

        jQuery(function($) {
        var count = $('#machine2 article').length,
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
            $('.m2').css(css).bind('click', function() {
                inc--;
                if (inc < 0) inc = count-1;
                $('.m2').css(css);
            }).bind('selectstart', function() {
                return false;
            });
        });
        //end of stack//

        jQuery(function($) {
        var count = $('#machine3 article').length,
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
            $('.m3').css(css).bind('click', function() {
                inc--;
                if (inc < 0) inc = count-1;
                $('.m3').css(css);
            }).bind('selectstart', function() {
                return false;
            });
        });
        //end of stack//
});