<script lang="ts">
	import '../app.css';
	import clsx from 'clsx';

	import { Toasts } from '$lib';
</script>

<Toasts position="bottom-left" />

<a
	href="https://github.com/Gibbu/svoast"
	target="_blank"
	rel="noopener noreferrer"
	class="inline-block absolute top-4 left-4 p-4 z-10 rounded-lg hover:bg-neutral-800 hover:text-white lg:fixed"
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-6 h-6">
		<path
			d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
		/>
	</svg>
</a>
<div class="w-screen lg:grid lg:grid-cols-2 lg:items-start">
	<aside class="flex items-center justify-center min-h-screen lg:sticky lg:top-0">
		<div class="m-auto">
			<h1 class="text-7xl font-display text-white font-bold">SVoast</h1>
			<p class="mt-4">A simple toast component for Svelte</p>
		</div>
	</aside>
	<main
		class={clsx(
			'p-4',
			'lg:p-16',
			'prose max-w-full prose-invert text-gray-400',
			'prose-headings:font-display prose-headings:text-white',
			'prose-pre:leading-[1.25] prose-pre:border prose-pre:border-neutral-800',
			'prose-hr:opacity-0'
		)}
	>
		<slot />
	</main>
</div>
