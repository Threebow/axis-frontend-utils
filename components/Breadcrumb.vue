<template lang="pug">
	li(:class="{'is-active': active}")
		a(:href="href")
			template(v-if="icon")
				icon(:icon="icon")
				span
					slot

			template(v-else)
				slot
</template>

<script>
	import Icon from "./icon";

	export default {
		props: {
			icon: String,
			href: String,
			active: Boolean
		},
		components: {
			Icon
		}
	};
</script>