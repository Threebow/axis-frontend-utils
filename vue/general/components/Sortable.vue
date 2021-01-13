<template lang="pug">
	div(ref="items")
		slot
</template>

<script>
	const {Sortable} = require("sortablejs");

	export default {
		props: {
			resource: String,
			shouldReload: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			Sortable.create(this.$refs.items, {
				onEnd: async () => {
					let ids = [];

					let children = this.$refs.items.children;
					for(let i = 0; i < children.length; i++) {
						ids.push(children[i].dataset.id);
					}

					try {
						await this.axios.post(this.resource, {ids});

						if(this.shouldReload) {
							this.reload();
						} else {
							this.toast("Sort order saved!");
						}
					} catch(e) {
						this.toast(e.message, "is-danger");
					}
				}
			});
		}
	};
</script>