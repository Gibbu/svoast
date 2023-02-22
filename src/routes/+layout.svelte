<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import clsx from 'clsx';
	import { version } from '../../package.json';

	import { position } from '$site/stores';
	import { Toasts, toast } from '$lib';

	import Toc from '$site/TOC.svelte';

	let content: HTMLElement;

	onMount(() => {
		toast.attention("You're looking beautiful today!", {
			duration: 10000,
			closable: true
		});
	});
</script>

{#key $position}
	<Toasts position={$position} />
{/key}

<section
	class="h-[450px] flex flex-col justify-center items-center text-center bg-black border-b border-neutral-800 relative"
>
	<h1 class="text-7xl font-display text-white font-bold relative flex items-start">
		SVoast
		<span class="opacity-30 text-sm absolute -right-8 select-none pointer-events-none">v{version}</span>
	</h1>
	<p class="my-4">A simple toast component for Svelte</p>
	<a
		href="https://github.com/Gibbu/svoast"
		target="_blank"
		rel="noopener noreferrer"
		class="absolute bottom-4 right-4 inline-block p-4 z-10 rounded-lg hover:bg-neutral-800 hover:text-white"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-6 h-6">
			<path
				d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
			/>
		</svg>
	</a>
</section>

<main
	class="max-w-screen-xl mx-auto px-8 py-16 flex flex-col-reverse gap-16 xl:grid xl:grid-cols-[1fr,200px] xl:items-start"
>
	<article
		bind:this={content}
		class={clsx(
			'prose max-w-full prose-invert text-gray-400',
			'prose-headings:font-display prose-headings:text-white prose-headings:scroll-mt-8',
			'prose-pre:leading-[1.25] prose-pre:border prose-pre:border-neutral-800 prose-pre:relative prose-pre:p-0',
			'prose-pre:overflow-hidden',
			'prose-hr:opacity-0'
		)}
	>
		<slot />
	</article>
	<Toc {content} />
</main>
