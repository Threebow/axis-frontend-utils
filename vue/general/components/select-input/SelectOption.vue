<template lang="pug">
	a.dropdown-item.is-unselectable.select-option-dropdown-item(:class="{'is-active': isSelected}", :disabled="disabled", @click="onSelected")
		slot
</template>

<script>
	export default {
		data() {
			return {
				isSelected: this.selected
			};
		},
		props: {
			value: String,
			selected: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onSelected() {
				if(this.disabled) return;

				this.$parent.toggle();
				this.$parent.selectedValue = this.value;
			}
		}
	};
</script>