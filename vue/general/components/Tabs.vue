<template lang="pug">
	.tabs-container
		.level(v-if="$slots.level", :class="tabListClass")
			.level-left
				.level-item
					tab-list(:tabs="tabs", :selected-tab-idx="selectedTabIdx", @change="selectTab($event, true)")

			.level-right
				slot(name="level")

		tab-list(
			v-else,
			:class="tabListClass",
			:tabs="tabs",
			:selected-tab-idx="selectedTabIdx",
			@change="selectTab($event, true)"
		)

		.tabs-content(ref="tabContent")
			slot
</template>

<script>
	export default {
		data() {
			return {
				selectedTabIdx: -1,
				isMounted: false
			};
		},
		props: {
			tabListClass: {
				type: String,
				default: "mb-1"
			},
			pushState: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			tabs() {
				if(this.isMounted) {
					return this.$slots.default
						.map(c => c.componentInstance)
						.filter(c => c?.$options?._componentTag === "tab");
				} else return [];
			},
			hasSlug() {
				return this.tabs
					.every(t => t.slug);
			},
			selectedTab() {
				return this.tabs[this.selectedTabIdx];
			}
		},
		methods: {
			selectTab(idx, save = false) {
				this.selectedTabIdx = idx;
				this.$emit("change", this.selectedTabIdx);

				for(let i = 0; i < this.tabs.length; i++) {
					this.tabs[i].active = this.selectedTabIdx === i;
				}

				if(save && this.hasSlug) {
					if(this.pushState) {
						history.pushState(null, null, "#" + this.selectedTab.slug);
					} else {
						history.replaceState(null, null, "#" + this.selectedTab.slug);
					}
				}
			},
			setTabFromHash() {
				let tabIdx = 0;

				if(this.hasSlug) {
					let slug = window.location.hash.slice(1);

					if(slug) {
						tabIdx = this.tabs
							.findIndex(t => t.slug === slug);
					}
				}

				this.selectTab(tabIdx > -1 ? tabIdx : 0);
			},
			onPopState() {
				this.setTabFromHash();
			}
		},
		mounted() {
			this.isMounted = true;
			this.setTabFromHash();
		},
		created() {
			if(this.pushState) {
				window.addEventListener("popstate", this.onPopState);
			}
		},
		destroyed() {
			if(this.pushState) {
				window.removeEventListener("popstate", this.onPopState);
			}
		}
	};
</script>