<script lang="ts">
	// TODO: is there a better pattern for this?
	// TODO: this component needs a re-work --> currently ?s= not accepted

	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { building } from '$app/environment';

	let { label = '' as string, searchParamsKey = '' as string, ...props } = $props();

	// We don't use bind:value= with shared state from parent components here, since it is
	// too complicated with query params & $effect https://bsky.app/profile/paolo.ricciuti.me/post/3lf464y4erc2h)

	// get initial state from url params
	let searchText = $derived.by(() => {
		return !building ? page.url.searchParams?.get(searchParamsKey) || '' : '';
	});

	function handleChange(evt: Event) {
		const inputEl = evt.target as HTMLInputElement;

		// get current search params
		const newSearchParams = !building ? page.url.searchParams : new URLSearchParams();

		if (inputEl.value != '') {
			newSearchParams.set(searchParamsKey, inputEl.value);
		} else {
			newSearchParams.delete(searchParamsKey);
		}

		// TODO: find a clever solution for this to not do it in every function?
		// reset pagination, because there is a new result set
		newSearchParams.delete('p');

		// call new URL
		console.log('--- goto called ---', { newSearchParams: newSearchParams.toString() });
		goto(`?${newSearchParams.toString()}`); // TODO: use replace state?
	}
</script>

<label>
	<input aria-label={label} type="text" value={searchText} onchange={handleChange} {...props} />
</label>

<style>
	label {
		margin-top: 10px;
	}
</style>
