<script lang="ts">
	import Custom from '$site/CustomComponent.svelte';
	import { toast, type ToastType } from '$lib';
	import { fakeApi } from '$site/utils';

	let types: ToastType[] = ['info', 'attention', 'success', 'warning', 'error', 'promise'];
	let type: ToastType = 'attention';

	async function save() {
		if (type !== 'promise') {
			toast[type]('Custom component!', {
				duration: '10s',
				component: [Custom, { link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', newTab: true }]
			});
		} else {
			toast.promise(fakeApi(3, 6), {
				loading: 'Loading...',
				success: 'Wahoo!',
				error: 'Bad!',
				component: [Custom, { link: 'https://www.youtube.com/watch?v=oYmqJl4MoNI', newTab: true }]
			});
		}
	}
</script>

<select class="select" bind:value={type}>
	{#each types as type}
		<option value={type}>{type}</option>
	{/each}
</select>

<button type="button" class="btn" on:click={save}>Save Changes</button>
