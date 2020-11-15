module.exports = {
	install(Vue) {
		Vue.component("csrf", require("../components/CSRFTokenInput"));

		Vue.mixin({
			computed: {
				csrfToken() {
					return document.querySelector("meta[name='csrf-token']").content;
				}
			}
		});
	}
};