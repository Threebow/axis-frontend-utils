<template lang="pug">
	label.label.is-unselectable(v-if="label")
		span.is-heading {{ label }}
		icon.has-text-danger(v-if="required", icon="fas fa-asterisk fa-fw fa-xs")
</template>

<script>
	export default {
		props: {
			label: String,
			required: Boolean
		}
	};
</script>

<style lang="scss" scoped>
	label {
		display: flex;
		align-items: center;
	}
</style>