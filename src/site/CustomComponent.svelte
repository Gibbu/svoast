<script lang="ts">
	import clsx from 'clsx';

	import type { ToastType } from '$lib';

	let {
		message,
		type,
		id,
		duration,
		link,
		newTab
	}: {
		message: string;
		type: ToastType;
		id: number;
		duration: number | string;
		link: string;
		newTab: boolean;
	} = $props();

	const types = {
		info: 'bg-gray-600',
		attention: 'bg-blue-400',
		success: 'bg-green-500',
		warning: 'bg-orange-500',
		error: 'bg-red-500',
		promise: 'bg-slate-600'
	};
</script>

<div
	id="svoast-{id}"
	class={clsx(
		`${types[type]}`,
		'relative text-white font-semibold pointer-events-auto py-2 px-4 text-sm rounded overflow-hidden'
	)}
>
	<div class="flex gap-4 items-center">
		<p>{message}</p>
		{#if type !== 'promise'}
			<a
				class="bg-white text-black px-3 py-1.5 rounded"
				href={link}
				target={newTab ? '_blank' : undefined}
				rel={newTab ? 'noreferrer noopener' : undefined}
			>
				Open
			</a>
		{/if}
	</div>
	{#if type !== 'promise'}
		<div class="customAnimation absolute w-full bottom-0 left-0 h-1 bg-black/30" style="--duration: {duration}ms"></div>
	{/if}
</div>

<style>
	.customAnimation {
		animation: timeBar var(--duration) linear forwards;
	}
	@keyframes timeBar {
		from {
			width: 100%;
		}
		to {
			width: 0%;
		}
	}
</style>
