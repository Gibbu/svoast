import { defineMDSveXConfig as defineConfig, escapeSvelte } from 'mdsvex';
import slug from 'rehype-slug';
import externalLinks from 'remark-external-links';
import { codeToHtml } from 'shiki';

const config = defineConfig({
	extensions: ['.svx'],

	highlight: {
		highlighter: async (code, lang = 'text') => {
			const returned = await codeToHtml(code, {
				theme: 'github-dark',
				lang
			});
			const html = escapeSvelte(returned);
			return `{@html \`${html}\` }`;
		}
	},

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [[externalLinks, { target: '_blank', rel: 'noopener noreferrer' }]],
	rehypePlugins: [slug]
});

export default config;
