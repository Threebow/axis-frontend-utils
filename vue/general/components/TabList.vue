<template lang="pug">
	.tabs(:class="tabListClass")
		ul
			li(v-for="(tab, idx) in tabs", :class="{'is-active': selectedTabIdx === idx}", @click="onTabClicked(idx)")
				a(:href="tab.href") {{ tab.name }}
</template>

<script>
	export default {
		props: {
			tabs: Array,
			selectedTabIdx: Number,
			tabListClass: {
				type: String,
				default: "mb-1"
			}
		},
		methods: {
			onTabClicked(idx) {
				if(!this.tabs[idx]?.href) {
					this.$emit("change", idx);
				}
			}
		}
	};
</script>