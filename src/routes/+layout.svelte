<script>
	// import from node_modules/
	import 'simpledotcss';
	import '$styles/global.scss';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Austrian Web Dev Companies ⛰️ 🇦🇹</title>
	<meta
		name="description"
		content="Looking for a web developer job can be tiresome, this directory might help (a bit). Good luck!"
	/>
</svelte:head>

<Header />

<main>
	<slot />
</main>

<Footer />
