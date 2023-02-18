<script lang="ts">
	import { toast } from '$lib';

	let duration: number = 3000;
	let closable: boolean = false;

	const launch = () => {
		toast.success('Options toast and things.', { duration, closable });
	};
</script>

<div class="flex gap-4 flex-col lg:items-center lg:flex-row">
	<input type="number" min="1000" step="1000" class="input" bind:value={duration} />

	<div class="flex-1">
		<label class="inline-flex items-center gap-4 cursor-pointer">
			<input type="checkbox" bind:checked={closable} />
			<p>Closable</p>
		</label>
	</div>

	<button class="btn" type="button" on:click={launch}> Launch toast </button>
</div>
