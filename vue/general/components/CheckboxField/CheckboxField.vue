<template lang="pug">
	.field
		input(v-bind="$attrs", type="hidden", :value="selectedValue ? 1 : 0")

		.control
			.level-simple
				.mr-2.is-flex-shrink-0(:class="[checkboxClass, activeClass]", :disabled="disabled", @click="toggle")
					.switch-inner(v-if="this.switch", :class="activeClass")
					.checkbox-input-circular-inner(v-else-if="circular", :class="activeClass")
					icon(v-else, :class="activeClass", icon="fas fa-check")

				input-label(:label="label")
</template>

<script>
	export default {
		data() {
			return {
				selectedValue: this.value
			};
		},
		props: {
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
			}
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