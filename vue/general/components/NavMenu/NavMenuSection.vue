<template lang="pug">
	.menu-section
		p.menu-label {{ label }}
		ul.menu-list
			slot
</template>

<script>
	export default {
		props: {
			label: String
		}
	};
</script>