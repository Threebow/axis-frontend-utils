<template lang="pug">
	.control.markdown-editor-control
		textarea(v-bind="$attrs", :maxlength="maxlength", ref="input")
</template>

<script>
	const SimpleMDE = require("simplemde");

	export default {
		data() {
			return {
				editor: null
			};
		},
		props: {
			maxlength: Number,
			value: {
				type: String,
				default: ""
			},
			countCharacters: {
				type: Boolean,
				default: true
			}
		},
		mounted() {
			this.editor = new SimpleMDE({
				element: this.$refs.input,
				autoDownloadFontAwesome: false,
				toolbar: [
					{
						name: "bold",
						action: SimpleMDE.toggleBold,
						className: "fas fa-bold",
						title: "Bold"
					},
					{
						name: "italic",
						action: SimpleMDE.toggleItalic,
						className: "fas fa-italic",
						title: "Italic"
					},
					{
						name: "heading",
						action: SimpleMDE.toggleHeadingSmaller,
						className: "fas fa-heading",
						title: "Heading"
					},
					"|",
					{
						name: "quote",
						action: SimpleMDE.toggleBlockquote,
						className: "fas fa-quote-left",
						title: "Quote"
					},
					{
						name: "code",
						action: SimpleMDE.toggleCodeBlock,
						className: "fas fa-code",
						title: "Code"
					},
					{
						name: "unordered-list",
						action: SimpleMDE.toggleUnorderedList,
						className: "fas fa-list-ul",
						title: "Unordered List"
					},
					{
						name: "ordered-list",
						action: SimpleMDE.toggleOrderedList,
						className: "fas fa-list-ol",
						title: "Ordered List"
					},
					"|",
					{
						name: "link",
						action: SimpleMDE.drawLink,
						className: "fas fa-link",
						title: "Create Link"
					},
					{
						name: "image",
						action: SimpleMDE.drawImage,
						className: "fas fa-image",
						title: "Insert Image"
					},
					"|",
					{
						name: "guide",
						action: "https://simplemde.com/markdown-guide",
						className: "fas fa-question-circle",
						title: "Guide"
					}
				]
			});

			if(this.maxlength && this.countCharacters) {
				let update = el => {
					let isContentTooLong = this.charCount > this.maxlength;
					el.innerHTML = `${isContentTooLong ? `<span class="icon has-text-danger"><i class="fas fa-exclamation-triangle"></i></span>` : ""}<span class="${isContentTooLong ? "has-text-danger" : ""}">${this.formattedCharCount}</span>`;
				};

				this.editor.createStatusbar([{
					className: "chars",
					defaultValue: update,
					onUpdate: update
				}]);
			}

			this.editor.value(this.value);
		},
		computed: {
			charCount() {
				let val = this.editor.value();
				let newLines = val.match(/(\r\n|\n|\r)/g);
				return val.length + (newLines ? newLines.length : 0);
			},
			formattedCharCount() {
				return `${this.charCount} / ${this.maxlength}`;
			}
		},
		methods: {
			refresh() {
				this.editor.codemirror.refresh();
			}
		}
	};
</script>