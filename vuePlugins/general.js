module.exports = {
	install(Vue) {
		Vue.component("icon", require("../components/Icon").default);
		Vue.component("breadcrumbs", require("../components/Breadcrumbs").default);
		Vue.component("breadcrumb", require("../components/Breadcrumb").default);
		Vue.component("delete-button", require("../components/DeleteButton").default);

		Vue.component("input-label", require("../components/InputLabel").default);
		Vue.component("text-input", require("../components/TextInput").default);
		Vue.component("file-input", require("../components/FileInput").default);
		Vue.component("select-input", require("../components/SelectInput").default);
		Vue.component("checkbox-input", require("../components/CheckboxInput").default);
		Vue.component("submit-button", require("../components/SubmitButton").default);

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