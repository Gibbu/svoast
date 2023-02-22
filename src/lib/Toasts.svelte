<script lang="ts">
	import Toast from './Toast.svelte';
	import { toast as toasts, position as toastPos } from './stores';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import type { ToastPosition } from './types';
	import type { ComponentType } from 'svelte';

	export let position: ToastPosition = 'bottom-left';
	export let animation = {
		start: 0.75,
		opacity: 0,
		duration: 150
	};
	export let component: ComponentType | undefined = undefined;

	$toastPos = position;
</script>

<div class="svoast-container" data-position={position}>
	{#each $toasts as toast (toast.id)}
		<div
			class="svoast-wrapper"
			data-position={position}
			in:scale={{ start: animation.start, duration: animation.duration }}
			out:scale={{ duration: animation.duration }}
			animate:flip={{ duration: animation.duration }}
		>
			{#if toast?.component || component}
				{@const { component, ...props } = toast}
				<svelte:component this={toast?.component[0] || component} {...props} />
			{:else}
				<Toast {toast} />
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	.svoast {
		&-container {
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
		&-wrapper {
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
	}
</style>
