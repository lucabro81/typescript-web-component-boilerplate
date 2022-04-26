#! /usr/bin/env node
const utils = require('./utils');
const fs = require('fs-extra');
const { exec } = require("child_process");

const myArgs = process.argv.slice(2);
const nameComponent = myArgs[0];

const kebabNameComponent = utils.kebabCase(nameComponent);
const pascalNameComponent = utils.pascalCase(nameComponent);
const camelNameComponent = utils.camelCase(nameComponent);

const regexNameComponent = /{{cmpName}}/gm;
const regexNameComponentPascalCase = /{{cmpNamePascalCase}}/gm;
const regexNameComponentCamelCase = /{{cmpNameCamelCase}}/gm;

const componentsDir = `./src/components/${kebabNameComponent}`;
const cssDir = `${componentsDir}/styles`;

if (nameComponent) {

	// create a folder for the component class, css, and template
	fs.mkdirSync(componentsDir);

	// create a folder for the css filss
	fs.mkdirSync(cssDir);

	//////////
	// READ //
	//////////

	// read the class template
	let classTemplate = fs.readFileSync('./scripts/templates/componentClass.template', 'utf8');
	classTemplate = classTemplate.replace(regexNameComponent, kebabNameComponent)
		.replace(regexNameComponentPascalCase, pascalNameComponent);

	// read the class definition type
	let classDefinitionTemplate = fs.readFileSync('./scripts/templates/componentClassDefinition.template', 'utf8');
	classDefinitionTemplate = classDefinitionTemplate.replace(regexNameComponent, kebabNameComponent)
		.replace(regexNameComponentPascalCase, pascalNameComponent);

	// read the html template
	let htmlTemplate = fs.readFileSync('./scripts/templates/componentHTML.template', 'utf8');
	htmlTemplate = htmlTemplate.replace(regexNameComponent, kebabNameComponent);

	// read the index template
	let indexTemplate = fs.readFileSync('./scripts/templates/index.template', 'utf8');
	indexTemplate = indexTemplate.replace(regexNameComponentCamelCase, camelNameComponent)
		.replace(regexNameComponentPascalCase, pascalNameComponent)
		.replace(regexNameComponent, kebabNameComponent);
	
	// read the index definition type template
	let indexDTemplate = fs.readFileSync('./scripts/templates/index.d.template', 'utf8');
	indexDTemplate = indexDTemplate.replace(regexNameComponentCamelCase, camelNameComponent);

	// read the observed attributes template
	let observedAttributesTemplate = fs.readFileSync('./scripts/templates/observedAttributes.template', 'utf8');

	// read main css
	let mainCssTemplate = fs.readFileSync('./scripts/templates/mainCss.template', 'utf8');

	// read variables css
	let variablesCssTemplate = fs.readFileSync('./scripts/templates/_variablesCss.template', 'utf8');

	///////////
	// WRITE //
	///////////

	// ts file
	fs.writeFileSync(`${componentsDir}/${kebabNameComponent}.component.ts`, classTemplate, function (err) {
		if (err) return console.log(err);
	});
	console.log(`Created ${componentsDir}/${kebabNameComponent}.component.ts`);

	// d.ts file
	fs.writeFileSync(`${componentsDir}/${kebabNameComponent}.component.d.ts`, classDefinitionTemplate, function (err) {
		if (err) return console.log(err);
	});
	console.log(`Created ${componentsDir}/${kebabNameComponent}.component.d.ts`);

	// ts observed attributes file
	fs.writeFileSync(`${componentsDir}/${kebabNameComponent}.observed-attributes.ts`, observedAttributesTemplate, function (err) {
		if (err) return console.log(err);
	});
	console.log(`Created ${componentsDir}/${kebabNameComponent}.component.ts`);

	// html file
	fs.writeFileSync(`${componentsDir}/${kebabNameComponent}.html`, htmlTemplate, function (err) {
		if (err) return console.log(err);
	});
	console.log(`Created ${componentsDir}/${kebabNameComponent}.html`);

	// index.ts file
	fs.writeFileSync(`${componentsDir}/index.ts`, indexTemplate, function (err) {
		if (err) return console.log(err);
	});
	console.log(`Created ${componentsDir}/index.ts`);

	// index.d.ts file
	fs.writeFileSync(`${componentsDir}/index.d.ts`, indexDTemplate, function (err) {
		if (err) return console.log(err);
	});
	console.log(`Created ${componentsDir}/index.d.ts`);

	// css files
	fs.writeFileSync(`${componentsDir}/styles/main.css`, mainCssTemplate, function (err) {
		if (err) return console.log(err);
	});
	console.log(`Created ${cssDir}/main.css`);

	fs.writeFileSync(`${cssDir}/_variables.css`, variablesCssTemplate, function (err) {
		if (err) return console.log(err);
	});
	console.log(`Created ${cssDir}/_variables.css`);

	fs.writeFileSync(`${cssDir}/_modifiers.css`, '', function (err) {
		if (err) return console.log(err);
	});
	console.log(`Created ${cssDir}/_modifiers.css`);

	// update main.ts
	let main = fs.readFileSync('./src/main.ts','utf8');

	// find last import
	let lastImportPosition = 0;
	main.match(/import {? ?[a-zA-Z0-9]* ?}? from '.*';\n?/g).forEach((item) => {
		lastImportPosition += item.length;
	})

	// insert observedAttributes import for the component
	const observedAttributesImport = `import observedAttributes${pascalNameComponent} from './components/${kebabNameComponent}/${kebabNameComponent}.observed-attributes';\n`;
	main = main.slice(0, lastImportPosition) + observedAttributesImport + main.slice(lastImportPosition);

	// find last wrap
	let lastWrapPositionEnd = main.indexOf('customElements');
	lastWrapPositionEnd = (lastWrapPositionEnd === -1) ? main.length : lastWrapPositionEnd;
	const customElementsArr = main.match(/customElements.define['a-zA-Z0-9-, ()=>.\/]*;\n?/g);

	if (customElementsArr) {
		customElementsArr.forEach((item, offset) => {
			lastWrapPositionEnd += item.length;
		});
	}

	// insert wrap function for dynamic import
	const wrapDynamicImport = `customElements.define(\'${kebabNameComponent}\', wrap(()=>import(\'./components/${kebabNameComponent}/${kebabNameComponent}.component\'), \'${pascalNameComponent}\', observedAttributes${pascalNameComponent}));\n`;
	main = main.slice(0, lastWrapPositionEnd) + wrapDynamicImport + main.slice(lastWrapPositionEnd);

	// insert wrap function for dynamic import
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