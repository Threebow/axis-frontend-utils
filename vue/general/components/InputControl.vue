<template lang="pug">
	.control(:class="[size, {'is-loading': loading, 'is-expanded': expanded, 'has-icons-left': icon, 'has-icons-right': iconRight}]")
		textarea.textarea(
			v-if="$attrs.type === 'textarea'",
			v-bind="$attrs",
			:class="inputClass",
			ref="input",
			@input="$emit('input', $event.target.value)",
			@keyup.enter="$emit('enter', $event.target.value)"
		)

		input.input(
			v-else,
			v-bind="$attrs",
			:class="inputClass",
			ref="input",
			@input="$emit('input', $event.target.value)",
			@keyup.enter="$emit('enter', $event.target.value)"
		)

		span.icon.is-left(v-if="icon")
			i(:class="icon")

		span.icon.is-right(v-if="iconRight")
			i(:class="iconRight")
</template>

<script>
	export default {
		data() {
			return {
				type: null
			};
		},
		props: {
			color: String,
			size: String,
			icon: String,
			iconRight: String,
			expanded: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			inputClass() {
				return [this.color, this.size];
			}
		},
		methods: {
			focus() {
				return this.$refs.input.focus();
			}
		}
	};
</script>