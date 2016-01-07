$(document).ready(function() {

	var toggleButton = document.getElementById('nav-trigger'),
	slide = document.querySelector('.menu-list'),
	eyeClosed= document.querySelector('.eye-closed');

toggleButton.addEventListener('click', toggleSlider, false);

// toggleButton.addEventListener('click', hideEye, false);

	function toggleSlider() {
	  if (slide.classList.contains('closed')) {
	    slide.classList.remove('closed');
	    $(".eye").attr("src","img/eye_shut.png");
	  } else {
	    slide.classList.add('closed');
	    $(".eye").attr("src","img/eye.gif");

	  }
	}
	// function hideEye() {
	//   if (eyeClosed.classList.contains('hide')) {
	//     eyeClosed.classList.remove('hide');
	//   } else {
	//     eyeClosed.classList.add('hide');
	//   }
	// }
});