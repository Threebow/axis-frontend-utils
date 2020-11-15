module.exports = {
	install(Vue) {
		Vue.mixin({
			methods: {
				reload() {
					window.location.reload(true);
				}
			},
			computed: {
				route() {
					return window.route;
				},
				user() {
					return window.User;
				}
			}
		});

		if(process.env.NODE_ENV === "development") {
			Vue.config.errorHandler = (err) => {
				alert(`Vue Error: ${err.message}`);
				console.error(err);
			};
		}
	}
};