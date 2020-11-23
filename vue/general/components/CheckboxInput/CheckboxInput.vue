<template lang="pug">
	.field
		input(type="hidden", :name="name", :value="selectedValue ? 1 : 0")

		.control
			.is-flex.is-flex-direction-row.is-align-items-center
				.custom-checkbox.mr-2.is-flex-shrink-0(:class="{'is-circular': circular}", :disabled="disabled", @click="toggle")
					icon(:class="{'is-active': selectedValue}", icon="fas fa-check")

				input-label(:label="label")

			p.help(v-if="help") {{ help }}
</template>

<script>
	export default {
		data() {
			return {
				selectedValue: this.value
			};
		},
		props: {
			name: String,
			label: String,
			value: {
				type: Boolean,
				default: false
			},
			circular: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			help: String
		},
		methods: {
			toggle() {
				if(this.disabled) return;

				this.selectedValue = !this.selectedValue;
				this.$emit("input", this.selectedValue);
			}
		},
		computed: {
			id() {
				return "checkbox" + this._uid;
			}
		}
	};
</script>