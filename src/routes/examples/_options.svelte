<script lang="ts">
	import { toaster } from '$lib';

	let duration: number = 3000;
	let closable: boolean = false;
	let infinite: boolean = false;
	let rich: boolean = false;

	const launch = () => {
		if (infinite) {
			const message = rich
				? `This toast <u><strong>${closable ? 'can' : 'will never'}</strong></u> disappear.`
				: `This toast ${closable ? 'can' : 'will never'} disappear.`;
			toaster.attention(message, {
				duration,
				closable,
				infinite,
				rich
			});
		} else {
			const message = rich
				? `This toast will disappear in <u><strong>${duration / 1000}s</strong></u>.`
				: `This toast will disappear in ${duration / 1000}s.`;
			toaster.attention(message, { duration, closable, rich });
		}
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
		<label class="inline-flex items-center gap-2 cursor-pointer">
			<input type="checkbox" bind:checked={rich} />
			<p>Rich Content</p>
		</label>
	</div>
</div>
<div class="flex gap-4">
	<button class="btn" type="button" on:click={launch}>Add toast</button>
	<button type="button" class="btn" on:click={() => toaster.removeByIndex(0)}>Remove oldest</button>
	<button type="button" class="btn" on:click={() => toaster.removeAll()}>Remove all</button>
</div>
