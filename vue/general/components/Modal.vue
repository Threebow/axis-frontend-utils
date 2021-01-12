<template lang="pug">
	.modal.is-active(v-if="isOpened")
		.modal-background(@click="close")

		.modal-content
			slot

		button.modal-close.is-large(@click="close")
</template>

<script>
	export default {
		data() {
			return {
				isOpened: false
			};
		},
		watch: {
			isOpened(val) {
				document.documentElement.classList.toggle("is-clipped", val);
			}
		},
		methods: {
			open() {
				this.isOpened = true;
			},
			close() {
				this.isOpened = false;
			},
			toggle() {
				this.isOpened = !this.isOpened;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.modal, .modal-close {
		position: fixed !important;
	}
</style>