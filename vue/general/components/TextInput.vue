<template lang="pug">
	.field(:class="{'is-fullwidth': fullwidth}")
		input-label(:label="label", :required="required")

		.control(:class="{'has-icons-left': icon}")
			textarea.textarea(
				v-if="textArea",
				:name="name",
				:class="inputClass",
				:placeholder="placeholder",
				:value="value",
				:required="required",
				:maxlength="max",
				:disabled="disabled",
				ref="input"
			)

			input.input(
				v-else,
				:name="name",
				:type="type",
				:class="inputClass",
				:value="value",
				:placeholder="placeholder",
				:min="min",
				:step="step",
				:max="max",
				:required="required",
				v-on:input="$emit('input', $event.target.value)",
				:disabled="disabled",
				ref="input",
				@keyup.enter="$emit('enter', $event.target.value)"
			)

			span.icon.is-left(v-if="icon")
				i(:class="icon")

		p.help(v-if="help") {{ help }}
</template>

<script>
	export default {
		props: {
			label: String,
			name: String,
			textArea: {
				type: Boolean,
				default: false
			},
			value: {
				type: String,
				default: ""
			},
			inputClass: {
				type: String,
				default: ""
			},
			fullwidth: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: "text"
			},
			help: String,
			placeholder: {
				type: [String, Number],
				default: ""
			},
			icon: String,
			required: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			min: Number,
			step: Number,
			max: Number
		},
		methods: {
			focus() {
				return this.$refs.input.focus();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.field.is-fullwidth {
		width: 100%;
	}
</style>