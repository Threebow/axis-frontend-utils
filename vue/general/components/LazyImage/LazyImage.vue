<template lang="pug">
	figure.image.lazy-image(ref="wrapper", v-observe-visibility="onVisibilityChanged", :style="figureStyles", :class="{'has-loaded': hasLoaded}")
		.spinner-container(v-if="!loadInstantly", :class="{'has-loaded': hasLoaded}")
			.spinner(:style="spinnerStyles")

		img(v-bind="$attrs", :class="[imgClass, imageClass]", ref="image", @load="onLoad", @error="onLoad")

		.lazy-image-overlay(v-if="$slots.default")
			slot
</template>

<script>
	import { ObserveVisibility } from "vue-observe-visibility";

	let loadedImages = new Set();

	export default {
		data() {
			return {
				hasLoaded: false,
				hasBeenSeen: false,
				loadInstantly: false,
				spinnerStyles: {},
				observer: null
			};
		},
		directives: {
			ObserveVisibility
		},
		props: {
			src: String,
			imgClass: {
				type: String,
				default: ""
			},
			circular: {
				type: Boolean,
				default: false
			},
			cover: {
				type: Boolean,
				default: false
			},
			rounded: {
				type: Boolean,
				default: false
			},
			fit: {
				type: Boolean,
				default: false
			},
			blurred: {
				type: Boolean,
				default: false
			},
			backgroundImage: String
		},
		watch: {
			src(newVal, oldVal) {
				if(oldVal) {
					this.updateSrc(newVal);
				}
			}
		},
		methods: {
			updateSrc() {
				let img = this.$refs.image;
				if(!img) return;

				this.hasLoaded = false;

				if(this.hasBeenSeen) {
					img.src = this.src;
				}

				//Fall back to normal loading
				if(!window.IntersectionObserver) {
					img.src = this.src;
				}

				if(img.src && img.complete) {
					this.hasLoaded = true;
					img.style.opacity = 1;
				}
			},
			onLoad() {
				if(this.hasLoaded) return;
				this.hasLoaded = true;
			},
			onVisibilityChanged(visible) {
				if(!this.hasBeenSeen && visible) {
					this.hasBeenSeen = true;
					this.$refs.image.src = this.src;
					loadedImages.add(this.src);
				}
			}
		},
		computed: {
			imageClass() {
				return {
					"has-loaded": this.hasLoaded,
					"is-circular": this.circular,
					"is-cover": this.cover,
					"is-fit": this.fit,
					"is-blurred": this.blurred,
					"has-rounded-corners": this.rounded,
					"loads-instantly": this.loadInstantly
				};
			},
			figureStyles() {
				if(!this.backgroundImage) return {};

				return {
					"background-image": `url("${this.backgroundImage}")`
				};
			}
		},
		mounted() {
			let wrapper = this.$refs.wrapper;
			if(wrapper) {
				this.observer = new ResizeObserver(entries => {
					for(let i = 0; i < entries.length; i++) {
						let entry = entries[i];

						let style = window.getComputedStyle(entry.target);

						let width = parseFloat(style.getPropertyValue("width").slice(0, -2));
						let height = parseFloat(style.getPropertyValue("height").slice(0, -2));

						let smaller = Math.min(width, height);

						this.spinnerStyles = {
							"width": Math.ceil(smaller / 2) + "px",
							"height": Math.ceil(smaller / 2) + "px"
						};
					}
				});

				this.observer.observe(wrapper);
			}

			this.updateSrc(this.src);
		},
		destroyed() {
			if(this.observer) {
				this.observer.disconnect();
				this.observer = null;
			}
		}
	};
</script>