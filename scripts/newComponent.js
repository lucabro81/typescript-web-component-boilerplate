const utils = require('./utils');
const fs = require('fs-extra');

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

	// html file
	fs.writeFileSync(`${componentsDir}/${kebabNameComponent}.html`, htmlTemplate, function (err) {
		if (err) return console.log(err);
	});

	// css file
	fs.writeFileSync(`${componentsDir}/${kebabNameComponent}.css`, '', function (err) {
		if (err) return console.log(err);
	});

	// update main.ts
	let main = fs.readFileSync('./src/main.ts','utf8');
	main = main.replace(/\n$/gm,
		`\ncustomElements.define(\'${kebabNameComponent}\', wrap(()=>import(\'./components/${kebabNameComponent}/${kebabNameComponent}.component\'), \'${pascalNameComponent}\'));\n`);
	fs.writeFileSync('./src/main.ts', main, function (err) {
		if (err) return console.log(err);
	});

}
else {
	console.error('No component\'s name');
}