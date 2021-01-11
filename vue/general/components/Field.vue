<template lang="pug">
	.field
		input-label(:label="label", :required="required")

		template(v-if="hasAddons || grouped")
			.control
				.field(:class="{'has-addons': hasAddons, 'is-grouped': grouped}")
					slot

		slot(v-else)

		p.help(v-if="message") {{ message }}
</template>

<script>
	export default {
		data() {
			return {
				hasAddons: false,
				required: false
			};
		},
		props: {
			label: String,
			message: String,
			grouped: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			updateFromChildren() {
				if(!this.label) return;

				let hasAddons = this.$slots.default.length > 1 && !this.grouped;
				if(hasAddons !== this.hasAddons) {
					this.hasAddons = hasAddons;
				}

				let required = this.$slots.default
					.some(el => el.componentInstance?.$refs?.input?.required);

				if(required !== this.required) {
					this.required = required;
				}
			}
		},
		mounted() {
			this.updateFromChildren();
		},
		updated() {
			this.updateFromChildren();
		}
	};
</script>