$(function () {
	  $(".automatic p").each(function (i, elt) {
	    $(elt).css({
	      left: Math.random() * 1300,
	      top: Math.random() * 650
	    });
	  });
	});