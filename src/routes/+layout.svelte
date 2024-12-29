<script>
	// import from node_modules/
	import 'simpledotcss';
	import '$styles/global.scss';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />
