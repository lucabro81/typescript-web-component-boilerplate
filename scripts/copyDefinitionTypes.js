#! /usr/bin/env node

const fs = require('fs-extra');

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

		});

		console.log('definition types successfully copied');
	});
}
catch(e) {
	console.error(e.message);
}
