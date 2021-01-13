const FADE_DURATION = 0.25;

window.addEventListener("load", () => {
	let duration = FADE_DURATION * 1000;
	let end = Date.now() + duration;

	let preloader = document.getElementById("preloader");
	if(!preloader) return;

	function fadeOut() {
		let frac = (end - Date.now()) / duration;

		if(frac > 0) {
			preloader.style.opacity = frac;
			requestAnimationFrame(fadeOut);
		} else {
			preloader.parentElement.removeChild(preloader);
		}
	}

	requestAnimationFrame(fadeOut);
});