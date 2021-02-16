const axios = require("axios");

module.exports = {
	install(Vue, options = {}) {
		let client;

		Vue.mixin({
			computed: {
				axios() {
					if(!client) {
						let headers = {
							"Accept": "application/json",
							"Content-Type": "application/json"
						};

						if(options.csrf) {
							headers["X-CSRF-Token"] = this.csrfToken;
						}

						client = axios.create({headers});
					}

					return client;
				}
			}
		});
	}
};