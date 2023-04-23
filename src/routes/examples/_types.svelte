<script lang="ts">
	import { toast } from '$lib';
	import type { ToastType } from '$lib';

	let types: ToastType[] = ['info', 'attention', 'success', 'warning', 'error'];
	let type: ToastType = 'success';

	const messages = {
		info: 'You can press CTRL + K to focus the search bar.',
		attention: 'View our latest announcement post here.',
		success: 'Profile successfully updated.',
		warning: 'One of the fields do not meet the requirements.',
		error: 'This content is no longer accessable.'
	};

	$: message = messages[type];

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
