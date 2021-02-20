<template lang="pug">
	.tabs
		ul
			li(v-for="(tab, idx) in tabs", :class="{'is-active': selectedTabIdx === idx}", @click="onTabClicked(idx)")
				a(:href="tab.href", target="_blank") {{ tab.name }}
</template>

<script>
	export default {
		props: {
			tabs: Array,
			selectedTabIdx: Number
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