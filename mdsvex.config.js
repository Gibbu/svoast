import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import slug from 'rehype-slug';
import { lex, parse } from 'fenceparser';
import { renderCodeToHTML, runTwoSlash, createShikiHighlighter } from 'shiki-twoslash';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	highlight: {
		async highlighter(code, lang, meta) {
			let fence;

			try {
				fence = parse(lex([lang, meta].filter(Boolean).join(' ')));
			} catch (error) {
				throw new Error(`Could not parse the codefence for this code sample \n${code}`);
			}

			let twoslash;
			if (fence.twoslash === true) {
				twoslash = runTwoSlash(code, lang);
			}

			const highlighter = await createShikiHighlighter({ theme: 'github-dark' });
			const html = renderCodeToHTML(code, lang, fence, {}, highlighter, twoslash);
			return `{@html \`${html}\` }`;
		}
	},

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: [slug]
});

export default config;
