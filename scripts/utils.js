// get rid of group with too much -, spaces and underlines
const cleanStr = (str) => str.replace(/[\s-_]+/g, '-');

module.exports = {

	kebabCase: (str) => {

		str = str.trim().replace(/[A-Z]+/g, (found, offset) => {
			return (offset > 0 ? '-' : '') + found.toLowerCase();
		});

		return cleanStr(str);
	},

	camelCase: (str) => {

		str = cleanStr(str);

		return str.replace(/-[a-zA-Z]/g, (found, offset) => {
			return found.slice(1).toUpperCase();
		});
	},

	pascalCase: (str) => {

		str = cleanStr(str);
		str = str.slice(0, 1).toUpperCase()+str.slice(1);
		return str.replace(/-[a-zA-Z]/g, (found, offset) => {
			return found.slice(1).toUpperCase();
		});
	}

}