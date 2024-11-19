<script lang="ts">
	import Icon from './Icon.svelte';
	import { toaster } from './state.svelte';

	import type { ToastComponent } from './types';

	let { toast }: { toast: ToastComponent } = $props();
</script>

<div
	id="svoast-{toast.id}"
	class="svoast {toast.type}"
	data-position={toaster.position}
	aria-live="polite"
	role="status"
>
	<div class="svoast-bar"></div>
	<div class="svoast-icon {toast.type}">
		<Icon type={toast.type} />
	</div>
	<div class="svoast-message">
		{#if toast.rich}
			{@html toast.message}
		{:else}
			{toast.message}
		{/if}
	</div>
	{#if toast.closable && toast.type !== 'promise'}
		<button aria-label="Close toast" type="button" class="svoast-dismiss" onclick={() => toaster.removeById(toast.id)}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	{/if}
</div>

<style>
	.svoast {
		background: var(--svoast-bg, #333);
		color: var(--svoast-text, #fff);
		padding: var(--svoast-padding, 12px 15px 12px 18px);
		border-radius: var(--svoast-radius, 4px);
		box-shadow: var(--svoast-shadow, 0 2px 7px hsl(0 0% 0% / 0.25));
		font-size: var(--svoast-font-size, 14px);
		position: relative;
		overflow: hidden;
		pointer-events: all;
		display: flex;
		gap: var(--svoast-dismiss-gap, 8px);
		max-width: var(--svoast-max-width, unset);

		&.info {
			--svoast-colour: var(--svoast-info-colour, #888);
		}
		&.attention {
			--svoast-colour: var(--svoast-attention-colour, #38bdf8);
		}
		&.success {
			--svoast-colour: var(--svoast-success-colour, #4ade80);
		}
		&.warning {
			--svoast-colour: var(--svoast-warning-colour, #fb923c);
		}
		&.error {
			--svoast-colour: var(--svoast-error-colour, #ef4444);
		}
	}
	.svoast-bar {
		position: absolute;
		top: 0;
		left: 0;
		width: var(--svoast-bar-width, 3px);
		height: 100%;
		background: var(--svoast-colour);
	}

	.svoast-icon {
		min-width: var(--svoast-icon-size, 21px);
		min-height: var(--svoast-icon-size, 21px);
		max-width: var(--svoast-icon-size, 21px);
		max-height: var(--svoast-icon-size, 21px);
		color: var(--svoast-colour);
		&.promise {
			animation: promiseSpin 1s linear infinite;
		}
	}
	.svoast-dismiss {
		min-width: var(--svoast-icon-size, 21px);
		min-height: var(--svoast-icon-size, 21px);
		max-width: var(--svoast-icon-size, 21px);
		max-height: var(--svoast-icon-size, 21px);
		padding: var(--svoast-icon-padding, 2px);
	}

	@keyframes promiseSpin {
		from {
			rotate: 0deg;
		}
		to {
			rotate: 360deg;
		}
	}
</style>
