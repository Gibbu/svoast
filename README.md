# SVoast

A simple toast component for Svelte.

## Usage

```svelte
<!-- routes/+layout.svelte -->
<script>
	import { Toasts } from 'svoast';
</script>

<Toasts />
```

```svelte
<!-- routes/settings/+page.svelte -->
<script>
	import { toast } from 'svoast';

	const save = () => {
		toast.success('Successfully update your profile.');
	};
</script>

<button on:click={save}>Save Changes</button>
```

## Docs

View more information at: https://svoast.vercel.app

## Licence

See the [LICENSE](https://github.com/Gibbu/svoast/blob/main/LICENSE) file for license rights and limitations (MIT).


SVoast logo by [Bruce Wayyn](https://github.com/brucewayyn).
