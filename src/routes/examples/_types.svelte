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

<div class="flex gap-4 flex-col lg:flex-row">
	<select class="select" bind:value={type}>
		{#each types as type}
			<option value={type}>{type}</option>
		{/each}
	</select>

	<input class="input flex-1" type="text" bind:value={message} />

	<button type="button" class="btn" on:click={launchToast}>Launch toast</button>
</div>
