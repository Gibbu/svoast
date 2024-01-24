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
	},
	typesVersions: {
		'>4.0': {
			'Icon.svelte': ['./Icon.svelte.d.ts'],
			'index.d.ts': ['./index.d.ts'],
			stores: ['./stores.d.ts'],
			'Toast.svelte': ['./Toast.svelte.d.ts'],
			'Toasts.svelte': ['./Toasts.svelte.d.ts'],
			types: ['./types.d.ts'],
			utils: ['./utils.d.ts']
		}
	}
};

fs.writeFileSync('./package/package.json', JSON.stringify(editedPkg, null, 2));

console.log('Updated package.json.');
