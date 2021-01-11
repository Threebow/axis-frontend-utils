<template lang="pug">
	.control
		.file.has-name.is-fullwidth
			label.file-label
				input.file-input(v-bind="$attrs", type="file", ref="input", @change="fileChanged")
				span.file-cta
					span.file-icon
						i.fas.fa-upload
					span.file-label Choose a file...
				span.file-name {{ fileName }}
</template>

<script>
	export default {
		data() {
			return {
				fileName: "None Selected"
			};
		},
		methods: {
			fileChanged(event) {
				let file = event.target.files[0];
				if(file) {
					this.fileName = file.name;
					this.$emit("input", file);
				}
			}
		}
	};
</script>