<script lang="ts">
	import { untrack } from 'svelte';

	import { goto, afterNavigate, beforeNavigate } from '$app/navigation';

	import FilterCheckboxes from '$lib/components/FilterCheckboxes.svelte';
	import FilterTextInput from '$lib/components/FilterTextInput.svelte';
	import ResultList from '$lib/components/ResultList.svelte';

	// Import available values for stack filters, etc. (hardcoded)
	import { availableFilterValues } from '$lib/shared';

	// Receive the current companies data from the `load` function via +page.ts
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	// Import shared state
	import {
		stackTagsState,
		specialTagsState,
		citiesState,
		searchTextState,
		paginationState
	} from '$lib/state.svelte';

	// Currently disabled because it interfered with $effect() below 🤔
	// TODO: is there a better pattern for that? or incorporate into another $effect?
	// Scroll to results after pagination clicks / navigation
	let resultListContainerEl: HTMLDivElement;
	/*let previousCurrentPage = $state(0);
	beforeNavigate(() => {
		console.log('beforeNavigate');
		// store previous current page before navigating
		previousCurrentPage = paginationState.currentPage - 1;
	});
	afterNavigate(() => {
		console.log('afterNavigate');
		const searchParams = new URLSearchParams(window.location.search);
		const p = searchParams.get('p');
		if (p !== null) {
			// only scroll if pagination param changed in URL
			if (parseInt(p) !== previousCurrentPage) {
				resultListContainerEl.scrollIntoView();
			}
		}
	});*/

	// Listen for filter state changes only
	// (Thanks very much to lt3 for this pattern, via Svelte Discord:
	// https://discord.com/channels/457912077277855764/1325805139126386699)
	// Critical feedback: https://bsky.app/profile/paolo.ricciuti.me/post/3lf464y4erc2h
	const effectParams = { init: true, exit: false };
	$effect(() => {
		// watch for any change in search params
		const selectedPhpCmses = [...stackTagsState.selectedPhpCmses];
		const selectedPhpFrameworks = [...stackTagsState.selectedPhpFrameworks];
		const selectedJavaScriptFrameworks = [...stackTagsState.selectedJavaScriptFrameworks];
		const selectedSpecialTags = [...specialTagsState.selectedValues];
		const selectedCities = [...citiesState.selectedValues];
		const searchText = searchTextState.text; // TODO: use snapshot?

		if (effectParams.init) {
			console.log('$effect init / onMount');
			effectParams.init = false;

			// On page load, we need to set filter state from URL params
			const searchParams = new URLSearchParams(window.location.search);
			stackTagsState.selectedPhpCmses = searchParams.get('phpCmses')?.split(',') || [];
			stackTagsState.selectedPhpFrameworks = searchParams.get('phpFrameworks')?.split(',') || [];
			stackTagsState.selectedJavaScriptFrameworks =
				searchParams.get('jsFrameworks')?.split(',') || [];
			specialTagsState.selectedValues = searchParams.get('specialTags')?.split(',') || [];
			citiesState.selectedValues = searchParams.get('cities')?.split(',') || [];
			searchTextState.text = searchParams.get('s') || '';

			// because updating selectedTags will cause effect to fire again, we'll exit in the next call
			effectParams.exit = true;

			// don't track paginationState in this $effect
			untrack(() => (paginationState.currentPage = parseInt(searchParams.get('p') || '1')));

			return;
		}

		// TODO: is there a better pattern?
		// avoid circular logic, since state is being updated above in the effect,
		// which would cause the effect to run again on this change.
		if (effectParams.exit) {
			console.log('$effect exit');
			effectParams.exit = false; // reset exit state
			return;
		}

		console.log('$effect fired after initialization, tracked $state changed - reset pagination');

		// Update URL params
		const params = new URLSearchParams();
		if (selectedPhpCmses.length > 0) params.set('phpCmses', selectedPhpCmses.join(','));
		if (selectedPhpFrameworks.length > 0)
			params.set('phpFrameworks', selectedPhpFrameworks.join(','));
		if (selectedJavaScriptFrameworks.length > 0)
			params.set('jsFrameworks', selectedJavaScriptFrameworks.join(','));
		if (selectedSpecialTags.length > 0) params.set('specialTags', selectedSpecialTags.join(','));
		if (selectedCities.length > 0) params.set('cities', selectedCities.join(','));
		if (searchText !== '') params.set('s', searchText);

		untrack(() => {
			// if filters were changed, we need to reset pagination param
			// but this should not cause $effect to re-run
			paginationState.currentPage = 1;
		});

		// navigate to new page / push url params
		// replaceState=true does not add history to browser, related to back button - but no full reload
		// TODO: get rid of replaceState? What is our goal?
		goto(`?${params.toString()}`, { replaceState: true });
	});
</script>

<div class="filters-container">
	<!-- {JSON.stringify(paginationState)} -->
	<div class="filters">
		<div>
			<h3>PHP CMSes</h3>
			<!-- Important: Use bind:statePropToBind=.. to pass the bindable as prop, otherwise this won't work -->
			<FilterCheckboxes
				labelsAndValues={availableFilterValues.phpCmses}
				bind:statePropToBind={stackTagsState.selectedPhpCmses}
			/>
		</div>

		<div>
			<h3>JavaScript</h3>
			<!-- Important: Use bind:statePropToBind=.. to pass the bindable as prop, otherwise this won't work -->
			<FilterCheckboxes
				labelsAndValues={availableFilterValues.javascriptFrameworks}
				bind:statePropToBind={stackTagsState.selectedJavaScriptFrameworks}
			/>
		</div>

		<div>
			<h3>Cities</h3>
			<!-- Important: Use bind:statePropToBind=.. to pass the bindable as prop, otherwise this won't work -->
			<FilterCheckboxes
				labelsAndValues={data.cityCounts}
				bind:statePropToBind={citiesState.selectedValues}
				urlParamKey="cities"
				style="max-height:150px; overflow:auto"
			/>
		</div>

		<div>
			<h3>PHP Frameworks</h3>
			<!-- Important: Use bind:statePropToBind=.. to pass the bindable as prop, otherwise this won't work -->
			<FilterCheckboxes
				labelsAndValues={availableFilterValues.phpFrameworks}
				bind:statePropToBind={stackTagsState.selectedPhpFrameworks}
			/>
		</div>

		<div>
			<h3>Specials</h3>
			<!-- Important: Use bind:statePropToBind=.. to pass the bindable as prop, otherwise this won't work -->
			<FilterCheckboxes
				labelsAndValues={availableFilterValues.specialTags}
				bind:statePropToBind={specialTagsState.selectedValues}
			/>
		</div>

		<div>
			<h3>Search Text</h3>
			<!-- Important: Use bind:statePropToBind=.. to pass the bindable as prop, otherwise this won't work -->
			<FilterTextInput
				label="Search for text"
				bind:statePropToBind={searchTextState.text}
				placeholder="Search term ..."
			/>
		</div>
	</div>
</div>

<div bind:this={resultListContainerEl}>
	<ResultList companiesData={data.companies} />
</div>

<style lang="scss">
	/* enable container queries */
	.filters-container {
		container-name: filtersContainer;
		container-type: inline-size;
		width: 100%;
	}

	.filters {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: 1rem;
		row-gap: 1rem;

		h3 {
			font-size: 1rem;
			margin-top: 0.5rem;
		}

		/* Container query for smaller containers */
		@container filtersContainer (max-width: 768px) {
			column-gap: 0.5rem;
			row-gap: 1rem;

			h3 {
				font-size: 0.9rem;
			}
		}

		/* Container query for very small containers */
		@container filtersContainer (max-width: 480px) {
			grid-template-columns: 1fr 1fr; /* Stack filters vertically */
			row-gap: 0.8rem;
			h3 {
				font-size: 0.85rem;

				/* Manage height and scrolling behavior for the Cities filter */
				div:nth-child(3) {
					max-height: 150px;
				}
			}
		}
	}
</style>
