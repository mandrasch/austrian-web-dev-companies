<script>
	// TODO: use npm version and import from node_modules/
	import '$styles/simple.min.css';
	import '$styles/global.scss';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />
