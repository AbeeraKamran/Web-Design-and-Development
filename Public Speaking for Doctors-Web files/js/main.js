// $( document ).ready(function() {

// 	var trigger = $(".menu-icon");
// 	var nav = $("nav");

// 	// hover on trigger - display half menu
// 	trigger.mouseover(function() {
// 		$("#nav").attr("style","overflow:visible");

// 	});

	

// });
$(document).ready(function(){
  $('.turn').click(function(){
    $('.cont-turn').toggleClass('flipped');
    return false;
  });

	//   $(".cancel").on("click",function(){
	//   $("form div").removeClass("mce_inline_error");
	//   $("form label").removeId("mce-success-response");
	//   $("form")[0].reset();
	// });

$(function() {

	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

});



});