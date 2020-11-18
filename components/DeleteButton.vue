<template lang="pug">
	a(:class="{'delete has-background-danger': circular, 'button is-danger': !circular, 'is-fullwidth': fullwidth}", :disabled="disabled", @click="destroy")
		slot
			icon(icon="fas fa-trash")
			span Delete
</template>

<script>
	export default {
		props: {
			resource: String,
			redirect: String,
			circular: {
				type: Boolean,
				default: false
			},
			fullwidth: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			async destroy() {
				if(this.disabled) return;

				if(confirm("Are you sure you want to delete this?")) {
					await this.axios.delete(this.resource);

					if(this.redirect) {
						window.location.href = this.redirect;
					} else {
						this.reload();
					}
				}
			}
		}
	};
</script>