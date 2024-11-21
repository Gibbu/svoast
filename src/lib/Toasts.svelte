<script lang="ts">
	import Toast from './Toast.svelte';
	import { toast as toaster } from './state.svelte';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { DEFAULT_ANIMATION, objectMerge } from './utils';

	import type { ToastPosition, ToastAnimation } from './types';
	import type { Component } from 'svelte';

	type Props = {
		position?: ToastPosition;
		animation?: ToastAnimation;
		component?: Component;
	};

	let { position = 'bottom-left', animation, component }: Props = $props();

	const ANIMATION = objectMerge(DEFAULT_ANIMATION, animation);
</script>

<div class="svoast-container" data-position={position}>
	{#each toaster.toasts as toast (toast.id)}
		<div
			class="svoast-wrapper"
			data-position={position}
			in:scale={{ start: ANIMATION.start, opacity: ANIMATION.opacity, duration: ANIMATION.duration }}
			out:scale={{ duration: ANIMATION.duration }}
			animate:flip={{ duration: ANIMATION.duration }}
		>
			{#if toast?.component?.[0] || component}
				{@const { component: _, ...props } = toast}
				{@const Rendered = toast?.component?.[0] || component}
				<Rendered {...props} />
			{:else}
				<Toast {toast} />
			{/if}
		</div>
	{/each}
</div>

<style>
	.svoast-container {
		position: fixed;
		padding: var(--svoast-offset, 16px);
		top: 0;
		height: 100%;
		width: 100%;
		pointer-events: none;
		z-index: 999;
		display: flex;
		flex-direction: column;
		gap: var(--svoast-gap, 16px);
		overflow: hidden;

		&[data-position*='center'] {
			align-items: center;
		}
		&[data-position*='bottom'] {
			justify-content: flex-end;
		}
		&[data-position*='center'] {
			left: 50%;
			transform: translateX(-50%);
		}
		&[data-position*='-left'] {
			left: 0;
			align-items: flex-start;
		}
		&[data-position*='-right'] {
			right: 0;
			align-items: flex-end;
		}
	}
	.svoast-wrapper {
		&[data-position='bottom-center'] {
			transform-origin: bottom center;
		}
		&[data-position='bottom-left'] {
			transform-origin: bottom left;
		}
		&[data-position='bottom-right'] {
			transform-origin: bottom right;
		}
		&[data-position='top-center'] {
			transform-origin: top center;
		}
		&[data-position='top-left'] {
			transform-origin: top left;
		}
		&[data-position='top-right'] {
			transform-origin: top right;
		}
	}
</style>
