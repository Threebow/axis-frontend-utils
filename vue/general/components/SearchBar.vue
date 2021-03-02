<template lang="pug">
	field.has-addons
		input-control(v-bind="$attrs", v-model="content", expanded, @enter="search")

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
			}
		},
		methods: {
			search() {
				let url = new URL(this.redirectUrl, window.location.origin);
				url.searchParams.delete("page");
				url.searchParams.set(this.param, this.content);

				document.location.href = url;
			},
			reset() {
				this.content = "";
			}
		},
		mounted() {
			let url = new URL(window.location.href);
			this.content = url.searchParams.get(this.param) ?? "";
		}
	};
</script>