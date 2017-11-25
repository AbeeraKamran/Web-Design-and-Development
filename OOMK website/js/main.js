$(document).ready(function() {
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
    	    $('.cover').css(css).bind('click', function() {
    	        inc--;
    	        if (inc < 0) inc = count-1;
    	        $('.cover').css(css);
    	    }).bind('selectstart', function() {
    	        return false;
    	    });
	});
	//end of stack//

	//MASONRY//

	$('#masonry').masonry({
    itemSelector: '.grid-item',
    columnWidth: function( containerWidth ) {
        return containerWidth / 4;
    }
	});

    $('#masonry').masonry({ isFitWidth: true });

	function masonry_init(){
        var container = document.querySelector('#masonry');
        var masonry = new Masonry(container, {
            gutter: container.querySelector('.gut_width'),
            itemSelector: '.grid-item',
            columnWidth: container.querySelector('.col_width')
        });
    }
    window.onload = masonry_init;

	//MASONRY//


	dirR = "+=2";
	dirL = "+=2";

	function moveDir() {
	if (Math.random() > 0.95) {
	  swapDirL();
	}
	if (Math.random() < 0.05) {
	  swapDirR();
	}
	}

	function swapDirL() {
	    if(dirL == "+=2") {
	        dirL = "-=2";
	    }
	    else {
	      dirL = "+=2";   
	    }
	}

	function swapDirR() {
	    dirR == "+=2" ? dirR = "-=2" : dirR = "+=2";   
	}


	setInterval (function() { $("#manifesto").css("left", dirL); $("#manifesto").css("top", dirR); moveDir(); } , 50)
		setInterval (function() { $("#buy-current-issue").css("right", dirL); $("#buy-current-issue").css("bottom", dirR); moveDir(); } , 50)

});