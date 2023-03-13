<script lang="ts">
	import { toast } from '$lib';

	const save = () => {
		const success = Math.random() < 0.5;
		if (success) {
			toast.success('Settings successfully updated.', {
				onMount() {
					console.log('Success mounted');
				},
				onRemove() {
					console.log('Success removed');
				}
			});
		} else {
			toast.error('There was a problem trying to save your settings.', { duration: 12000, closable: true });
		}
	};
</script>

<button type="button" class="btn" on:click={save}>Save Changes</button>
