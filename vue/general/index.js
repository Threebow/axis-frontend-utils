function toKebabCase(str) {
	return str
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
		.toLowerCase();
}

module.exports = {
	install(Vue) {
		let ctx = require.context("./components/", true, /\.vue$/);

		let keys = ctx.keys();
		for(let i = 0; i < keys.length; i++) {
			let path = keys[i];
			let name = path.split("/").pop().split(".")[0];
			Vue.component(toKebabCase(name), ctx(path).default);
		}

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