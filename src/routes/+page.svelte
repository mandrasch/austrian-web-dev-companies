<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

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
		searchTextState
	} from '$lib/state.svelte';

	// TODO: is onMount the right thing for this?
	onMount(() => {
		console.log('the component has mounted');

		// On page load, we need to set filter state from URL params

		stackTagsState.selectedPhpCmses = data.url.searchParams.get('phpCmses')?.split(',') || [];
		stackTagsState.selectedPhpFrameworks =
			data.url.searchParams.get('phpFrameworks')?.split(',') || [];
		stackTagsState.selectedJavaScriptFrameworks =
			data.url.searchParams.get('jsFrameworks')?.split(',') || [];
		specialTagsState.selectedValues = data.url.searchParams.get('specialTags')?.split(',') || [];
		citiesState.selectedValues = data.url.searchParams.get('cities')?.split(',') || [];
		searchTextState.text = data.url.searchParams.get('s') || '';
	});

	// Listen for state changes, update URL params
	// TODO: where is the best place for this logic?
	// TODO: should I use effect() or $derived?
	// TODO: this is currently triggered to soon when we use onMount, see how others do it in tutorials!
	$effect(() => {
		console.log('$effect() triggered ...');

		// Very verbose here, can be refactored - but keeping it simple here for now

		// Serialize filters and pagination into query parameters
		const selectedPhpCmses = stackTagsState.selectedPhpCmses.join(',');
		const selectedPhpFrameworks = stackTagsState.selectedPhpFrameworks.join(',');
		const selectedJavaScriptFrameworks = stackTagsState.selectedJavaScriptFrameworks.join(',');
		const selectedSpecialTags = specialTagsState.selectedValues.join(',');
		const selectedCities = citiesState.selectedValues.join(',');
		const searchText = searchTextState.text;

		const params = new URLSearchParams();
		if (selectedPhpCmses) params.set('phpCmses', selectedPhpCmses);
		if (selectedPhpFrameworks) params.set('phpFrameworks', selectedPhpFrameworks);
		if (selectedJavaScriptFrameworks) params.set('jsFrameworks', selectedJavaScriptFrameworks);
		if (selectedSpecialTags) params.set('specialTags', selectedSpecialTags);
		if (selectedCities) params.set('cities', selectedCities);
		if (searchText) params.set('s', searchText);

		// Trigger a page load with new query parameters
		goto(`?${params.toString()}`, { replaceState: true });
	});
</script>

<div class="filters-container">
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
				style="max-height:175px; overflow:scroll"
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
			<FilterTextInput
				label="Search for text"
				bind:statePropToBind={searchTextState.text}
				placeholder="Search term ..."
			/>
		</div>
	</div>
</div>

<ResultList
	companiesData={data.companies}
	total={data.total}
	limit={data.limit}
	currentPage={data.currentPage}
/>

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
			grid-template-columns: 1fr; /* Stack filters vertically */
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
