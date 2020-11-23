<template lang="pug">
	.button-group(:class="{'is-stack': stack, 'is-centered': centered, 'is-opposite': opposite}")
		slot
</template>

<script>
	export default {
		props: {
			stack: {
				type: Boolean,
				default: false
			},
			centered: {
				type: Boolean,
				default: false
			},
			opposite: {
				type: Boolean,
				default: false
			}
		}
	};
</script>