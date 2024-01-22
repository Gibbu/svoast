import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const editedPkg = {
	...pkg,
	exports: {
		'.': {
			svelte: './index.js'
		},
		'./package.json': './package.json',
		'./Icon.svelte': './Icon.svelte',
		'./stores': './stores.js',
		'./Toast.svelte': './Toast.svelte',
		'./Toasts.svelte': './Toasts.svelte',
		'./types': './types.js',
		'./utils': './utils.js'
	}
};

fs.writeFileSync('./package/package.json', JSON.stringify(editedPkg, null, 2));

console.log('Updated package.json.');
