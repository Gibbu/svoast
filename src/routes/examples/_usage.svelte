<script lang="ts">
	import { toast } from '$lib';

	function launchToast() {
		toast.success('Super good looking toast ;)');
	}
</script>

<button type="button" class="btn" onclick={launchToast}>Launch Toast</button>
