<template lang="pug">
	.field
		input-label(:label="label", :required="required")

		.control
			.dropdown(:class="{'is-active': isActive, 'is-fullwidth': fullwidth}")
				.dropdown-trigger
					button.button.select-input-dropdown-trigger(ref="trigger", @click.prevent="toggle")
						span(v-if="selectedValue") {{ buttonLabel }}
						span.has-text-muted(v-else) ~ select a value ~
						icon.is-small(icon="fas fa-angle-down")

					select(:name="name", :required="required")
						option(v-if="selectedValue", :value="selectedValue", selected)

				.dropdown-menu.select-input-dropdown-menu
					.dropdown-content(ref="content")
						slot

		p.help(v-if="help") {{ help }}
</template>

<script>
	export default {
		data() {
			return {
				isActive: false,
				selectedValue: null,
				buttonLabel: null
			};
		},
		props: {
			label: String,
			name: String,
			help: String,
			required: {
				type: Boolean,
				default: false
			},
			fullwidth: {
				type: Boolean,
				default: false
			},
			value: String
		},
		watch: {
			selectedValue(val) {
				for(let i = 0; i < this.options.length; i++) {
					let child = this.options[i];
					child.isSelected = child.value === val;
				}

				let el = this.options.find(o => o.isSelected);
				this.buttonLabel = el ? el.$el.innerText : null;

				this.$emit("input", val);
			},
			value(val) {
				//prop changed extenrally
				if(val !== this.selectedValue) {
					this.selectedValue = val;
				}
			}
		},
		methods: {
			toggle() {
				this.isActive = !this.isActive;
			},
			onDocumentClick(e) {
				if(this.isActive && !this.$refs.content.contains(e.target) && !this.$refs.trigger.contains(e.target)) {
					this.toggle();
				}
			}
		},
		mounted() {
			document.addEventListener("click", this.onDocumentClick);

			let el = this.options.find(o => this.value ? o.value === this.value : o.isSelected);
			if(el) this.selectedValue = el.value;
		},
		computed: {
			options() {
				return [...this.$refs.content.children].map(c => c.__vue__);
			}
		},
		destroyed() {
			document.removeEventListener("click", this.onDocumentClick);
		}
	};
</script>

<style lang="scss" scoped>
	.dropdown.is-fullwidth {
		&, .dropdown-trigger, .select-input-dropdown-trigger, .dropdown-menu {
			width: 100%;
		}
	}

	.dropdown-trigger {
		position: relative;

		select {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;

			pointer-events: none;
			opacity: 0;
		}
	}
</style>