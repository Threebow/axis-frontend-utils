const fs = require("fs"),
	  path = require("path");


/*---------------------------------------------------------------------------
	Compile imports to SCSS of external components into one file
---------------------------------------------------------------------------*/
const VUE_PLUGIN_PATH = path.join(process.cwd(), "./vue");
const SCSS_PATH = path.join(process.cwd(), "./scss");

let vuePlugins = fs.readdirSync(path.join(VUE_PLUGIN_PATH), {withFileTypes: true})
	.filter(d => d.isDirectory() && fs.existsSync(path.join(VUE_PLUGIN_PATH, d.name, "components")))
	.map(d => d.name);

let imports = [];

for(let i = 0; i < vuePlugins.length; i++) {
	let cPath = path.join(VUE_PLUGIN_PATH, vuePlugins[i], "components");

	let styles = fs.readdirSync(cPath, {withFileTypes: true})
		.filter(d => d.isDirectory())
		.map(d => path.join(cPath, d.name, "styles.scss"))
		.filter(p => fs.existsSync(p))
		.map(p => path.relative(SCSS_PATH, p).replace(/\\/g, "/"))
		.map(i => `@import "${i}";`);

	imports.push(...styles);
}

fs.writeFileSync(path.join(SCSS_PATH, "_components.scss"), imports.join("\n"));