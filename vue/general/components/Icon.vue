<template lang="pug">
	span.icon
		i(:class="[icon, fixedWidth ? 'fa-fw' : '']")
</template>

<script>
	export default {
		props: {
			icon: String,
			fixedWidth: {
				type: Boolean,
				default: false
			}
		}
	};
</script>