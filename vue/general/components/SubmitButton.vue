<template lang="pug">
	.submit-button-wrapper(:class="{'is-right': (isRight && !fullwidth), 'is-fullwidth': fullwidth}")
		button.button(:class="{loading, [buttonClass]: true}", type="submit", :disabled="loading || disabled")
			slot
				icon(icon="fas fa-save")
				span Save
</template>

<script>
	export default {
		props: {
			isRight: {
				type: Boolean,
				default: true
			},
			fullwidth: {
				type: Boolean,
				default: false
			},
			buttonClass: {
				type: String,
				default: "is-primary"
			},
			loading: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			}
		}
	};
</script>

<style lang="scss" scoped>
	.submit-button-wrapper {
		display: flex;

		&.is-right {
			justify-content: flex-end;
		}

		&.is-fullwidth button {
			flex: 1;
			justify-content: center;
		}
	}
</style>