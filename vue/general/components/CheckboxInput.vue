<template lang="pug">
	div
		input.switch.is-rounded(:id="id", :name="`${name}:raw`", type="checkbox", :checked="value", @change="onChange")
		label.label(:for="id") {{ label }}
</template>

<script>
	export default {
		props: {
			uniqueId: String,
			name: String,
			label: String,
			value: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onChange(e) {
				this.$emit("input", e.target.checked);
			}
		},
		computed: {
			id() {
				return this.name + (this.uniqueId || this._uid);
			}
		}
	}
</script>