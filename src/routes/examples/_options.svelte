<script lang="ts">
	import { toast } from '$lib';

	let duration: number = 3000;
	let closable: boolean = false;
	let infinite: boolean = false;

	const launch = () => {
		if (infinite)
			toast.success(`This toast ${closable ? 'can' : 'will never'} disappear.`, {
				duration,
				closable,
				infinite
			});
		else toast.success(`This toast will disappear in ${duration / 1000}s.`, { duration, closable });
	};

	const remove = () => {
		toast.removeByIndex(0);
	};
</script>

<div class="flex gap-4 flex-col lg:items-center lg:flex-row">
	<input type="number" min="1000" step="1000" class="input" bind:value={duration} />

	<div class="flex gap-4 items-center flex-1">
		<label class="inline-flex items-center gap-2 cursor-pointer">
			<input type="checkbox" bind:checked={closable} />
			<p>Closable</p>
		</label>
		<label class="inline-flex items-center gap-2 cursor-pointer">
			<input type="checkbox" bind:checked={infinite} />
			<p>Infinite</p>
		</label>
	</div>

	<button class="btn" type="button" on:click={launch}>Add toast</button>
	<button type="button" class="btn" on:click={remove}>Remove oldest</button>
</div>
