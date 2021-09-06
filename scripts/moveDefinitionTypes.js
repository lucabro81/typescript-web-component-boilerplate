#! /usr/bin/env node

const fs = require('fs-extra');
const { exec } = require("child_process");

// copy typings.d.ts to package

try {
	fs.copySync('./src/typings.d.ts', './package/typings.d.ts')
	console.log('"typings.d.ts" successfully copied');
}
catch(e) {
	console.error(e.message);
}

try {
	fs.readdir('./src/components').then((arr) => {
		arr.forEach(dir => {

			// copy definition types

			fs.copySync(`./src/components/${dir}/${dir}.component.d.ts`, `./package/components/${dir}/${dir}.component.d.ts`);
			fs.copySync(`./src/components/${dir}/index.d.ts`, `./package/components/${dir}/index.d.ts`);

			// copy templates and stylesheets

			fs.copySync(`./src/components/${dir}/${dir}.html`, `./package/components/${dir}/${dir}.html`);
			fs.copySync(`./src/components/${dir}/${dir}.css`, `./package/components/${dir}/${dir}.css`);
		});

		console.log('definition types successfully copied');
		console.log('templates and stylesheets successfully copied');
	});
}
catch(e) {
	console.error(e.message);
}
