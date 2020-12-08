<template lang="pug">
	.panel-block
		span.panel-icon(v-if="icon")
			i(:class="icon")

		slot
</template>

<script>
	export default {
		props: {
			icon: String
		}
	};
</script>