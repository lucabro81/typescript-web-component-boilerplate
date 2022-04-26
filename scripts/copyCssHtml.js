#! /usr/bin/env node

const fs = require('fs-extra');

try {
	fs.readdir('./src/components').then((arr) => {
		arr.forEach(dir => {
			fs.copySync(`./src/components/${dir}/${dir}.html`, `./package/components/${dir}/${dir}.html`);
			fs.copySync(`./src/components/${dir}/styles`, `./package/components/${dir}/styles`);
		});

		console.log('templates and stylesheets successfully copied');
	});
}
catch(e) {
	console.error(e.message);
}
