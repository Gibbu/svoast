<script lang="ts">
	import Toast from './Toast.svelte';
	import { toast as toasts, position as toastPos } from './toast';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import type { ToastPosition } from './types';

	export let position: ToastPosition = 'bottom-left';
	export let animation = {
		start: 0.75,
		opacity: 0,
		duration: 150
	};

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
			<Toast {toast} />
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
			pointer-events: none;
			z-index: 999;
			display: flex;
			flex-direction: column;
			gap: var(--svoast-gap, 16px);
			&[data-position*='bottom'] {
				justify-content: flex-end;
			}
			&[data-position='bottom'],
			&[data-position='top'] {
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
			&[data-position='bottom'] {
				transform-origin: bottom center;
			}
			&[data-position='bottom-left'] {
				transform-origin: bottom left;
			}
			&[data-position='bottom-right'] {
				transform-origin: bottom right;
			}
			&[data-position='top'] {
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
