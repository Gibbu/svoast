<script lang="ts">
	import { toast } from '$lib';

	let duration: number = 3000;
	let closable: boolean = false;

	const launch = () => {
		toast.success('Options toast and things.', { duration, closable });
	};
</script>

<div>
	<input type="number" step="1000" class="input" bind:value={duration} />

	<div>
		<label>
			<input type="checkbox" bind:checked={closable} />
			<p>Closable</p>
		</label>
	</div>

	<button class="btn" type="button" on:click={launch}> Launch toast </button>
</div>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		gap: 16px;
		div {
			flex: 1;
		}
	}
	label {
		display: inline-flex;
		gap: 8px;
		cursor: pointer;
	}
</style>
