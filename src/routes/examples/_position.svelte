<script lang="ts">
	import { position } from '$site/stores';
	import type { ToastPosition } from '$lib';

	let pos: ToastPosition = 'bottom-left';

	const update = () => {
		$position = pos;
	};
</script>

<select class="select" bind:value={pos} on:change={update}>
	<option value="bottom-left">bottom-left</option>
	<option value="bottom-center">bottom-center</option>
	<option value="bottom-right">bottom-right</option>
	<option value="top-left">top-left</option>
	<option value="top-center">top-center</option>
	<option value="top-right">top-right</option>
</select>
