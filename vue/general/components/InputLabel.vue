<template lang="pug">
	label.label.is-unselectable(v-if="label")
		span.is-heading {{ label }}
		icon.has-text-danger(v-if="required", icon="fas fa-asterisk fa-fw fa-xs")
</template>

<script>
	export default {
		props: {
			label: String,
			required: {
				type: Boolean,
				default: false
			}
		}
	};
</script>

<style lang="scss" scoped>
	label {
		display: flex;
		align-items: stretch;

		.icon {
			height: auto;
		}
	}
</style>