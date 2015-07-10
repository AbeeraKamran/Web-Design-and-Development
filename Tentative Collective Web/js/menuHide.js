$(function() {
	$(".menu-icon").on('click', function() {
	  $("nav ul").toggleClass('hide');
  	  $(".row").toggleClass('hide');
  	  var padding = $('#main').css('padding-top');
    var newPadding = (padding=='0px')?'650px':'0px';
    $('#main').css('padding-top',newPadding);


	});
});
