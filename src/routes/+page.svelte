<script lang="ts">
	import { untrack } from 'svelte';

	// debug with {JSON.stringify([...page.url.searchParams])}
	// import { page } from '$app/state';

	import FilterCheckboxes from '$lib/components/FilterCheckboxes.svelte';
	import FilterTextInput from '$lib/components/FilterTextInput.svelte';
	import ResultList from '$lib/components/ResultList.svelte';

	// Import available values for stack filters, etc. (hardcoded)
	import { availableFilterValues } from '$lib/shared';

	// Receive the current companies data from the `load` function via +page.ts
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	// Our source of truth is the URL query param $state,
	// see ResultList.svelte and FilterCheckboxes.svelte

	// TODO: might be removed, tried to use it for scroll to results after navigation
	let resultListContainerEl: HTMLDivElement;
</script>

<div class="filters-container">
	<div class="filters">
		<div>
			<h3>PHP CMSes</h3>
			<FilterCheckboxes
				labelsAndValues={availableFilterValues.phpCmses}
				searchParamsKey="phpCmses"
			/>
		</div>

		<div>
			<h3>JavaScript</h3>
			<FilterCheckboxes
				labelsAndValues={availableFilterValues.javascriptFrameworks}
				searchParamsKey="jsFrameworks"
			/>
		</div>

		<div>
			<h3>Cities</h3>
			<FilterCheckboxes
				labelsAndValues={data.cityCounts}
				searchParamsKey="cities"
				style="max-height:150px; overflow:auto"
			/>
		</div>

		<div>
			<h3>PHP Frameworks</h3>
			<FilterCheckboxes
				labelsAndValues={availableFilterValues.phpFrameworks}
				searchParamsKey="phpFrameworks"
			/>
		</div>

		<div>
			<h3>Specials</h3>
			<FilterCheckboxes
				labelsAndValues={availableFilterValues.specialTags}
				searchParamsKey="specialTags"
			/>
		</div>

		<div>
			<h3>Search Text</h3>
			<FilterTextInput label="Search for text" searchParamsKey="s" placeholder="Search term ..." />
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
