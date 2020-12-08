<template lang="pug">
	.panel
		p.panel-heading(v-if="title") {{ title }}
		slot
</template>

<script>
	export default {
		props: {
			title: String
		}
	};
</script>