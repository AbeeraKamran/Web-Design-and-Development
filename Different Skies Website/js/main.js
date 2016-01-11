$(document).ready(function() {

	var toggleButton = document.getElementById('nav-trigger'),
	slide = document.querySelector('.menu-list');

toggleButton.addEventListener('click', toggleSlider, false);

	function toggleSlider() {
	  if (slide.classList.contains('closed')) {
	    slide.classList.remove('closed');
	  } else {
	    slide.classList.add('closed');
	  }
	}
});
