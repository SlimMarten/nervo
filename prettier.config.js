module.exports = {
	trailingComma: "es5",
	bracketSpacing: true,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: false,
	printWidth: 150,
	parser: "babel",
	overrides: [
		{
			files: "*.json",
			options: {
				parser: "json",
			},
		},
	],
};
