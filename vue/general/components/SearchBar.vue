<template lang="pug">
	field.has-addons
		input-control(
			v-bind="$attrs",
			expanded,
			:value="content",
			@input="content = $event",
			@enter="search"
		)

		.control(v-if="content.length > 0")
			button.button(:class="resetButtonClass", @click="reset")
				icon.is-small(icon="fas fa-times")

		.control
			button.button.is-primary(@click="search")
				icon(icon="fas fa-search")
</template>

<script>
	export default {
		data() {
			return {
				content: ""
			};
		},
		props: {
			value: String,
			param: {
				type: String,
				default: "search"
			},
			redirectUrl: {
				type: String,
				default: window.location.href
			},
			resetButtonClass: {
				type: [String, Object],
				default: "is-dark"
			},
			reloadOnReset: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			value(val) {
				this.content = val;
			},
			content(val) {
				this.$emit("input", val);
			}
		},
		methods: {
			search() {
				if(this.$listeners.search) {
					this.$emit("input", this.content);
					this.$emit("search", this.content);
					return;
				}

				let url = new URL(this.redirectUrl, window.location.origin);
				url.searchParams.delete("page");
				url.searchParams.set(this.param, this.content);

				document.location.href = url;
			},
			reset() {
				this.content = "";

				if(this.reloadOnReset) {
					this.search();
				}
			}
		},
		mounted() {
			if(this.value !== undefined) {
				this.content = this.value;
				return;
			}

			let url = new URL(window.location.href);
			this.content = url.searchParams.get(this.param) ?? "";
		}
	};
</script>