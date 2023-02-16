<script lang="ts">
	import '../app.css';
	import clsx from 'clsx';
</script>

<div class="h-screen w-screen overflow-x-hidden overflow-y-auto grid grid-cols-2 items-start">
	<aside class="flex items-center justify-center sticky top-0 min-h-screen">
		<div class="m-auto">
			<h1 class="text-7xl font-display text-white font-bold">SVoast</h1>
			<p class="mt-4">A simple and customizable toast component for Svelte</p>
		</div>
	</aside>
	<main
		class={clsx(
			'p-16',
			'prose max-w-full prose-invert text-gray-400',
			'prose-headings:font-display prose-headings:text-white',
			'prose-pre:leading-[1.25] prose-pre:border prose-pre:border-neutral-800',
			'prose-hr:opacity-0'
		)}
	>
		<slot />
	</main>
</div>
