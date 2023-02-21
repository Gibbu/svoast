<script lang="ts">
	import clsx from 'clsx';

	import type { ToastType, ToastOptions } from '$lib';

	export let message: string;
	export let type: ToastType;
	export let id: number;
	export let opts: NonNullable<ToastOptions>;
	export let link: string;

	const types = {
		info: 'bg-gray-600',
		attention: 'bg-blue-400',
		success: 'bg-green-500',
		warning: 'bg-orange-500',
		error: 'bg-red-500'
	} as const;
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
		<a class="bg-white text-black px-3 py-1.5 rounded" href={link} target="_blank" rel="noreferrer noopener">
			Open
		</a>
	</div>
	<div
		class="customAnimation absolute w-full bottom-0 left-0 h-1 bg-black/30"
		style="--duration: {opts.duration}ms"
	/>
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
