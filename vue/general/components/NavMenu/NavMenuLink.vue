<template lang="pug">
	li
		a(v-bind="$attrs", :class="{'is-active': active}")
			icon.mr-1(v-if="icon", :icon="icon", fixed-width)
			span
				slot
</template>

<script>
	export default {
		props: {
			icon: String,
			active: {
				type: Boolean,
				default: false
			}
		}
	};
</script>