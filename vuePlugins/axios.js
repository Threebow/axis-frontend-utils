const axios = require("axios");

module.exports = {
	install(Vue, options = {}) {
		let client;

		Vue.mixin({
			computed: {
				axios() {
					if(!client) {
						client = axios.create({
							headers: options.csrf ? {"X-CSRF-Token": this.csrfToken} : {}
						});
					}

					return client;
				}
			}
		});
	}
};