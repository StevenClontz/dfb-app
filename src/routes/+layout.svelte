<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Menu Review App</title>
	<meta name="description" content="Review and discover delicious menu items" />
</svelte:head>

{@render children?.()}
