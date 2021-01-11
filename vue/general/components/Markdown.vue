<template lang="pug">
	.content.markdown-content(v-html="html")
</template>

<script>
	const DOMPurify = require("dompurify"),
		  marked    = require("marked");

	export default {
		props: {
			markdown: String,
			minimal: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			html() {
				return DOMPurify.sanitize(marked(this.markdown), this.sanitizationOptions);
			},
			sanitizationOptions() {
				if(!this.minimal) return {};
				return {ALLOWED_TAGS: ["p", "strong", "em", "ul", "li"]};
			}
		}
	};
</script>

<style lang="scss" scoped>
	.markdown-content {
		word-wrap: break-word;
	}
</style>