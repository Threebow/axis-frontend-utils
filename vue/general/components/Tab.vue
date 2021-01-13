<template lang="pug">
	.tab-content(:class="{'is-hidden': !this.active}")
		slot
</template>

<script>
	export default {
		data() {
			return {
				active: false
			};
		},
		props: {
			name: String,
			slug: String
		}
	};
</script>