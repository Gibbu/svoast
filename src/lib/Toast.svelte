<script lang="ts">
	import Icon from './Icon.svelte';
	import { toast as _toast, position } from './stores';
	import type { ToastComponent } from './types';

	export let toast: ToastComponent;
</script>

<div
	id="svoast-{toast.id}"
	class="svoast {toast.type}"
	data-position={$position}
	aria-live="polite"
	role="status"
>
	<div class="svoast-bar" />
	<div class="svoast-icon">
		<Icon type={toast.type} />
	</div>
	<div class="svoast-message">
		{#if toast.rich}
			{@html toast.message}
		{:else}
			{toast.message}
		{/if}
	</div>
	{#if toast.closable}
		<button type="button" class="svoast-dismiss" on:click={() => _toast.removeById(toast.id)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	{/if}
</div>

<style lang="scss">
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

		&-bar {
			position: absolute;
			top: 0;
			left: 0;
			width: var(--svoast-bar-width, 3px);
			height: 100%;
			background: var(--svoast-colour);
		}
		&-icon {
			width: var(--svoast-icon-size, 21px);
			height: var(--svoast-icon-size, 21px);
			color: var(--svoast-colour);
		}
		&-dismiss {
			width: var(--svoast-icon-size, 21px);
			height: var(--svoast-icon-size, 21px);
			padding: var(--svoast-icon-padding, 2px);
		}

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
</style>
