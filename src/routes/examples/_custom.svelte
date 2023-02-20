<script lang="ts">
	import Custom from '$site/CustomComponent.svelte';
	import { toast, type ToastType } from '$lib';

	let types: ToastType[] = ['info', 'attention', 'success', 'warning', 'error'];
	let type: ToastType = 'attention';

	async function save() {
		toast[type]('Custom component!', {
			duration: 5000,
			component: [Custom, { link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', newTab: true }]
		});
	}
</script>

<select class="select" bind:value={type}>
	{#each types as type}
		<option value={type}>{type}</option>
	{/each}
</select>

<button type="button" class="btn" on:click={save}>Save Changes</button>
