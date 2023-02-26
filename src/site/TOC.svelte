<script lang="ts">
	import { tick } from 'svelte';
	import { debounce } from '$site/utils';

	export let content: HTMLElement;

	let headings: HTMLHeadElement[] = [];
	let active: HTMLHeadElement | undefined;
	let activeHash: string | undefined = undefined;

	$: content && mount();

	const mount = async () => {
		await tick();

		headings = Array.from(content.querySelectorAll('h1, h2, h3, h4, h5')).filter(
			(el) => el.id.length > 0
		) as HTMLHeadElement[];
	};

	const handleScroll = () => {
		if (headings) {
			const offsetHeight: number = document.querySelector('nav.nav')?.getBoundingClientRect().height || 80;
			active = [...headings]
				.reverse()
				.find((heading) => heading.offsetTop - 2 <= window.scrollY + offsetHeight);

			if (!active) {
				activeHash = undefined;
				replaceState(undefined);
			}

			if (active) {
				activeHash = '#' + active.id;
				replace();
			}
		}
	};

	const handleClick = (e: MouseEvent) => {
		const { hash } = e.currentTarget as HTMLAnchorElement;

		document.querySelector(hash)?.scrollIntoView({
			behavior: 'smooth'
		});
	};

	const replace = debounce(() => replaceState(activeHash), 250);

	const replaceState = (hash: string | undefined) => {
		const _hash = (hash?.startsWith('#') ? hash : '#' + hash).toLowerCase();
		window.history.replaceState(null, '', hash ? window.location.pathname + _hash : window.location.pathname);
	};
</script>

<svelte:window on:scroll={handleScroll} />

<aside class="xl:sticky xl:top-4">
	<h4 class="font-display text-sm mb-3 opacity-70 font-semibold">On this page</h4>
	<nav>
		<ul>
			{#each headings as heading}
				<li class="ml-[calc(var(--depth)*10px)]" style="--depth: {parseInt(heading.tagName.charAt(1)) - 1}">
					<a
						href="#{heading.id}"
						class="block py-1 {active?.id === heading.id ? 'text-white underline' : 'hover:text-white'}"
						on:click|preventDefault={handleClick}
					>
						{heading.innerText}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>
