const prettier = require('prettier')

const prettierSupportedExtensions = prettier
	.getSupportInfo()
	.languages.map(({ extensions }) => extensions)
	.flat()

module.exports = {
	[`**/*{${prettierSupportedExtensions}}`]: (filenames) =>
		`prettier --write ${filenames.map((filename) => `'${filename}'`).join(' ')}`,
	'**/*.{ts,tsx}': () => 'yarn type-check',
}
