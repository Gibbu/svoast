<script lang="ts">
	import { toaster } from '$lib';

	function launchToast() {
		toaster.success('Super good looking toast ;)');
	}
</script>

<button type="button" class="btn" onclick={launchToast}>Launch Toast</button>
