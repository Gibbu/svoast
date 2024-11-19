<script lang="ts">
	import { settings } from '$site/stores.svelte';
</script>

<select class="select" bind:value={settings.position}>
	<option value="bottom-left">bottom-left</option>
	<option value="bottom-center">bottom-center</option>
	<option value="bottom-right">bottom-right</option>
	<option value="top-left">top-left</option>
	<option value="top-center">top-center</option>
	<option value="top-right">top-right</option>
</select>
