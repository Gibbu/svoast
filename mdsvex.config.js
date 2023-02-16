import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import slug from 'rehype-slug';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: [slug]
});

export default config;
