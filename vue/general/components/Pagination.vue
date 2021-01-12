<template lang="pug">
	.is-flex(v-if="pages", :class="paginationClass")
		nav.pagination(:class="{'is-small': small}", role="navigation" aria-label="pagination")
			ul.pagination-list
				li(v-for="i in pages")
					a.pagination-ellipsis(v-if="!shouldShowPage(i) && ((i - 1) === 1 || (i + 1) === pages)") &hellip;
					a.pagination-link(v-else-if="shouldShowPage(i)" :class="{'is-current': i === page + 1}" @click="goto(i)") {{ i }}
</template>

<script>
	export default {
		props: {
			total: Number,
			page: Number,
			perPage: Number,
			centered: {
				type: Boolean,
				default: false
			},
			small: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			pages() {
				return Math.ceil(this.total / this.perPage);
			},
			paginationClass() {
				return {
					"is-justify-content-center": this.centered,
					"is-justify-content-flex-end": !this.centered
				};
			}
		},
		methods: {
			goto(page) {
				let url = new URL(window.location.href);
				url.searchParams.set("page", page);
				document.location.href = url;
			},
			shouldShowPage(page) {
				//Allow the first or the last page regardless
				if(page === 1 || page === this.pages) return true;

				//Otherwise, only allow pages within a certain amount of pages of the current page
				return Math.abs(page - (this.page + 1)) < 4;
			}
		}
	};
</script>