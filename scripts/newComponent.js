#! /usr/bin/env node
const utils = require('./utils');
const fs = require('fs-extra');
const { exec } = require("child_process");

const myArgs = process.argv.slice(2);
const nameComponent = myArgs[0];

const kebabNameComponent = utils.kebabCase(nameComponent);
const pascalNameComponent = utils.pascalCase(nameComponent);

const regexNameComponent = /{{cmpName}}/gm;
const regexNameComponentCamelCase = /{{cmpNameCamelCase}}/gm;

const componentsDir = `./src/components/${kebabNameComponent}`;

if (nameComponent) {

	// create a folder for the component class, css, and template
	fs.mkdirSync(componentsDir);

	// read the class template
	let classTemplate = fs.readFileSync('./scripts/templates/componentClass.template', 'utf8');
	classTemplate = classTemplate.replace(regexNameComponent, kebabNameComponent)
		.replace(regexNameComponentCamelCase, pascalNameComponent);

	// read the html template
	let htmlTemplate = fs.readFileSync('./scripts/templates/componentHTML.template', 'utf8');
	htmlTemplate = htmlTemplate.replace(regexNameComponent, kebabNameComponent);

	// ts file
	fs.writeFileSync(`${componentsDir}/${kebabNameComponent}.component.ts`, classTemplate, function (err) {
		if (err) return console.log(err);
	});
	console.log(`Created ${componentsDir}/${kebabNameComponent}.component.ts`);

	// html file
	fs.writeFileSync(`${componentsDir}/${kebabNameComponent}.html`, htmlTemplate, function (err) {
		if (err) return console.log(err);
	});
	console.log(`Created ${componentsDir}/${kebabNameComponent}.html`);

	// css file
	fs.writeFileSync(`${componentsDir}/${kebabNameComponent}.css`, '', function (err) {
		if (err) return console.log(err);
	});
	console.log(`Created ${componentsDir}/${kebabNameComponent}.css`);

	// update main.ts
	let main = fs.readFileSync('./src/main.ts','utf8');
	main = main.replace(/\n$/gm,
		`\ncustomElements.define(\'${kebabNameComponent}\', wrap(()=>import(\'./components/${kebabNameComponent}/${kebabNameComponent}.component\'), \'${pascalNameComponent}\'));\n`);
	fs.writeFileSync('./src/main.ts', main, function (err) {
		if (err) return console.log(err);
	});
	console.log(`Imported ${kebabNameComponent} to main.ts`);

	exec(`git add ${componentsDir}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`Added ${kebabNameComponent} components to git`);
	});
}
else {
	console.error('No component\'s name');
}