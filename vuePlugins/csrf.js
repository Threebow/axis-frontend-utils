module.exports = {
	install(Vue) {
		Vue.component("csrf", require("../components/CSRFTokenInput").default);

		Vue.mixin({
			computed: {
				csrfToken() {
					return document.querySelector("meta[name='csrf-token']").content;
				}
			}
		});
	}
};