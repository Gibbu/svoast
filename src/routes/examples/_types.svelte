<script lang="ts">
	import { toaster } from '$lib';

	import type { ToastType } from '$lib';
	type Types = Exclude<ToastType, 'promise'>;

	let types: ToastType[] = ['info', 'attention', 'success', 'warning', 'error'];
	let type = $state<Types>('success');

	const messages: { [k in Types]: string } = {
		info: 'You can press CTRL + K to focus the search bar.',
		attention: 'View our latest announcement post here.',
		success: 'Profile successfully updated.',
		warning: 'One of the fields do not meet the requirements.',
		error: 'This content is no longer accessable.'
	};

	let message = $derived(messages[type as keyof typeof messages]);

	const launchToast = () => {
		toaster[type](message);
	};
</script>

<div class="flex gap-4 flex-col lg:flex-row">
	<select class="select" bind:value={type}>
		{#each types as type}
			<option value={type}>{type}</option>
		{/each}
	</select>

	<button type="button" class="btn" onclick={launchToast}>Launch toast</button>
</div>
