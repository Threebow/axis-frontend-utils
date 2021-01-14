<template lang="pug">
	.tabs(:class="tabListClass")
		ul
			li(v-for="(tab, idx) in tabs", :class="{'is-active': selectedTabIdx === idx}", @click="$emit('change', idx)")
				a {{ tab.name }}
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
		}
	};
</script>