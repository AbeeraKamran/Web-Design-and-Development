$(document).ready(function() {

	var toggleButton = document.getElementById('nav-trigger'),
	slide = document.querySelector('.menu-list'),
	thisTrigger = jQuery(this),
			thisMenu = thisTrigger.parent(),
			thisPanel = thisTrigger.next();

	toggleButton.addEventListener('click', toggleSlider, false);

	function toggleSlider() {
	  if (slide.classList.contains('closed')) {
	    slide.classList.remove('closed');

	  } else {
	    slide.classList.add('closed');
	    
	  }
	}

	//stack of images//
	jQuery(function($) {
    var count = $('#stack1 article').length,
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
	    $('.c2').css(css).bind('click', function() {
	        inc--;
	        if (inc < 0) inc = count-1;
	        $('.c2').css(css);
	    }).bind('selectstart', function() {
	        return false;
	    });
	});
	jQuery(function($) {
    var count = $('#stack2 article').length,
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
	    $('.c1').css(css).bind('click', function() {
	        inc--;
	        if (inc < 0) inc = count-1;
	        $('.c1').css(css);
	    }).bind('selectstart', function() {
	        return false;
	    });
	});
	//end of stack//
	jQuery(function($) {
    var count = $('#stack3 article').length,
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
	    $('.c3').css(css).bind('click', function() {
	        inc--;
	        if (inc < 0) inc = count-1;
	        $('.c3').css(css);
	    }).bind('selectstart', function() {
	        return false;
	    });
	});
	//end of stack//
	jQuery(function($) {
    var count = $('#stack4 article').length,
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
	    $('.c4').css(css).bind('click', function() {
	        inc--;
	        if (inc < 0) inc = count-1;
	        $('.c4').css(css);
	    }).bind('selectstart', function() {
	        return false;
	    });
	});
	//end of stack//
	jQuery(function($) {
    var count = $('#stack5 article').length,
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
	    $('.c5').css(css).bind('click', function() {
	        inc--;
	        if (inc < 0) inc = count-1;
	        $('.c5').css(css);
	    }).bind('selectstart', function() {
	        return false;
	    });
	});
	//end of stack//
});
