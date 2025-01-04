<script lang="ts">
	import FilterCheckboxes from '$lib/components/FilterCheckboxes.svelte';
	import ResultList from '$lib/components/ResultList.svelte';

	import { availableFilterValues } from '$lib/shared';

	import { stackTagsState, specialTagsState, citiesState } from '$lib/state.svelte';

	// Receive the companies data from the `load` function via +page.ts
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<div class="checkbox-groups">
	<div>
		<h3>PHP CMSes</h3>
		<!-- Important: Use bind:statePropToBind=.. to pass the bindable as prop, otherwise this won't work -->
		<FilterCheckboxes
			labelsAndValues={availableFilterValues.phpCmses}
			bind:statePropToBind={stackTagsState.selectedValues}
		/>
	</div>

	<div>
		<h3>JavaScript</h3>
		<!-- Important: Use bind:statePropToBind=.. to pass the bindable as prop, otherwise this won't work -->
		<FilterCheckboxes
			labelsAndValues={availableFilterValues.frontendFrameworks}
			bind:statePropToBind={stackTagsState.selectedValues}
		/>
	</div>

	<div>
		<h3>Cities</h3>
		<!-- Important: Use bind:statePropToBind=.. to pass the bindable as prop, otherwise this won't work -->
		<FilterCheckboxes
			labelsAndValues={data.cityCounts}
			bind:statePropToBind={citiesState.selectedValues}
		/>
	</div>

	<div>
		<h3>PHP Frameworks</h3>
		<!-- Important: Use bind:statePropToBind=.. to pass the bindable as prop, otherwise this won't work -->
		<FilterCheckboxes
			labelsAndValues={availableFilterValues.phpFrameworks}
			bind:statePropToBind={stackTagsState.selectedValues}
		/>
	</div>

	<div style="grid-column: span 2;">
		<h3>Specials</h3>
		<!-- Important: Use bind:statePropToBind=.. to pass the bindable as prop, otherwise this won't work -->
		<FilterCheckboxes
			labelsAndValues={availableFilterValues.specialTags}
			bind:statePropToBind={specialTagsState.selectedValues}
		/>
	</div>
</div>

<ResultList companiesData={data} />

<style lang="scss">
	.checkbox-groups {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: 1rem;
		row-gap: 1rem;

		h3 {
			font-size: 1rem;
			margin-top: 0.5rem;
		}
	}
</style>
