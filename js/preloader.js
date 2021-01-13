(() => {
	const FADE_DURATION = 0.25;

	//Ensure preloader element exists
	let preloader = document.getElementById("preloader");
	if(!preloader) return;

	//Clip html element
	document.documentElement.classList.add("is-clipped");

	//Start removal process on load
	window.addEventListener("load", () => {
		let duration = FADE_DURATION * 1000;
		let end = Date.now() + duration;

		document.documentElement.classList.remove("is-clipped");

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
})();