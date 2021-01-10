<template lang="pug">
	buttons(opposite, :stack="fullwidth")
		slot(name="before")

		button.button(:class="[buttonClass, {'is-loading': loading}]", :disabled="disabled || loading", type="submit")
			slot
				icon(icon="fas fa-save")
				span Save

		slot(name="after")
</template>

<script>
	export default {
		props: {
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