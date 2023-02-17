<script lang="ts">
	import { toast } from '$lib';
	import type { ToastType } from '$lib';

	let types: ToastType[] = ['info', 'attention', 'success', 'warning', 'error'];
	let type: ToastType = 'error';
	let message: string = 'There was an error. Please try again.';

	const launchToast = () => {
		toast[type](message);
	};
</script>

<div>
	<select class="select" bind:value={type}>
		{#each types as type}
			<option value={type}>{type}</option>
		{/each}
	</select>

	<input class="input" type="text" bind:value={message} />

	<button type="button" class="btn" on:click={launchToast}>Launch toast</button>
</div>

<style>
	div {
		display: flex;
		gap: 16px;
	}
	input {
		flex: 1;
	}
</style>
