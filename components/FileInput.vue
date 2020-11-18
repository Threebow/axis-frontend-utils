<template lang="pug">
	.field
		input-label(:label="label", :required="required")

		.control
			.file.has-name.is-fullwidth
				label.file-label
					input.file-input(type="file", :name="name", :required="required", accept="image/*" @change="fileChanged")
					span.file-cta
						span.file-icon
							i.fas.fa-upload
						span.file-label Choose a file...
					span.file-name {{ fileName }}

		p.help(v-if="help") {{ help }}
</template>

<script>
	export default {
		data() {
			return {
				fileName: "None Selected"
			};
		},
		props: {
			label: String,
			name: String,
			help: String,
			required: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			fileChanged(event) {
				let file = event.target.files[0];
				if(file) {
					this.fileName = file.name;
					this.$emit("file-changed", file);
				}
			}
		}
	};
</script>