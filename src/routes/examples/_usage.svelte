<script lang="ts">
	import { toast } from '$lib';

	async function launchToast() {
		toast.success('Super good looking toast ;)');
	}
</script>

<button type="button" class="btn" on:click={launchToast}>Launch Toast</button>
