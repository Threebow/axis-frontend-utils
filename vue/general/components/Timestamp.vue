<template lang="pug">
	span(v-if="formatted") {{ formatted }}
</template>

<script>
	export default {
		props: {
			date: [Date, String],
			compact: {
				type: Boolean,
				default: true
			},
			dateOnly: {
				type: Boolean,
				default: false
			},
			timeOnly: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			formatted() {
				if(!this.date) return "~";

				return this.formatDate(this.date, {
					compact: this.compact,
					dateOnly: this.dateOnly,
					timeOnly: this.timeOnly
				});
			}
		}
	};
</script>