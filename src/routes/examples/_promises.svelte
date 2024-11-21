<script lang="ts">
	import { toast } from '$lib';
	import { fakeApi } from '$site/utils';

	const save = () => {
		toast.promise(fakeApi(3, 6), {
			loading: 'Saving your profile...',
			success: 'Profile updated!',
			error: 'Something went wrong.',
			closable: true,
			onStart() {
				console.log('started');
			},
			onSuccess() {
				console.log('success');
			},
			onError() {
				console.log('error');
			},
			onFinish() {
				console.log('finished');
			}
		});
	};
</script>

<button type="button" class="btn" onclick={save}>Save Profile</button>
