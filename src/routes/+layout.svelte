<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Menu Review App</title>
	<meta name="description" content="Review and discover delicious menu items" />
</svelte:head>

{@render children?.()}

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
		min-height: 100vh;
	}
</style>
