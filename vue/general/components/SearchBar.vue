<template lang="pug">
	field.has-addons
		input-control(v-bind="$attrs", v-model="content", expanded, @enter="search")

		.control(v-if="content.length > 0")
			button.button.is-darker(@click="reset")
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