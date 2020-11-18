<template lang="pug">
	li(:class="{'is-active': active}")
		a(:href="href")
			template(v-if="icon")
				icon(:icon="icon", fixed-width)
				span
					slot

			template(v-else)
				slot
</template>

<script>
	export default {
		props: {
			icon: String,
			href: String,
			active: Boolean
		}
	};
</script>