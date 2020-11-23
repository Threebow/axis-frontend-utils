<template lang="pug">
	.field
		input(type="hidden", :name="name", :value="selectedValue ? 1 : 0")

		.control
			.is-flex.is-flex-direction-row.is-align-items-center
				.mr-2.is-flex-shrink-0(:class="[checkboxClass, activeClass]", :disabled="disabled", @click="toggle")
					.switch-inner(v-if="this.switch", :class="activeClass")
					icon(v-else, :class="activeClass", icon="fas fa-check")

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
			switch: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			help: String
		},
		watch: {
			value(val) {
				//prop changed extenrally
				if(val !== this.selectedValue) {
					this.selectedValue = val;
				}
			}
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
			},
			activeClass() {
				return {
					"is-active": this.selectedValue
				};
			},
			checkboxClass() {
				return {
					"switch-input": this.switch,
					"checkbox-input": !this.switch,
					"is-circular": !this.switch && this.circular
				};
			}
		}
	};
</script>