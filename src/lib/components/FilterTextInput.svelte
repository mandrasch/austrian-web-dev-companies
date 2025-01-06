<script lang="ts">
	// TODO: is there a better pattern for this?
	import { goto } from '$app/navigation';

	let { label, statePropToBind = $bindable(), ...props } = $props();

	// we use onchange here, otherwise $effect/go:to fire and change the URL after each inputted character (with bind:value and global $effect())
	// but currently bind:value directly triggers a new search in <ResultList> - how can we delay it till user typed?
	function handleChange() {
		// update URL state
		const searchParams = new URLSearchParams(window.location.search);
		if (statePropToBind === '') {
			searchParams.delete('s');
		} else {
			searchParams.set('s', statePropToBind);
		}
		goto(`?${searchParams.toString()}`, { replaceState: false });
	}
</script>

<label>
	<input
		aria-label={label}
		type="text"
		bind:value={statePropToBind}
		onchange={handleChange}
		{...props}
	/>
</label>

<style>
	label {
		margin-top: 10px;
	}
</style>
