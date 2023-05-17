<p align="center">
	<img width="300px" src="https://user-images.githubusercontent.com/122556307/221425114-757c3e73-3b0a-4df8-a5df-4475a7277124.svg" />
</p>

<p align="center">
	A simple toast component for Svelte.
</p>

---

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

<br>

## Changelog

You can view all the changes at https://svoast.vercel.app/changelog

<br>

## Licence

See the [LICENSE](https://github.com/Gibbu/svoast/blob/main/LICENSE) file for license rights and limitations (MIT).

<br>

## Credits

SVoast logo made by [Bruce Wayyn](https://github.com/brucewayyn).
