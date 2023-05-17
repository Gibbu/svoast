<script lang="ts">
	import { toast } from '$lib';
	import { fakeApi } from '$site/utils';

	const save = () => {
		toast.promise(fakeApi(3, 6), {
			loading: 'Saving your profile...',
			success: 'Profile updated!',
			error: 'Something went wrong.',
			closable: true
		});
	};
</script>

<button type="button" class="btn" on:click={save}>Save Profile</button>
