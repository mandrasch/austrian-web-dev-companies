<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Company } from '$lib/types';

	import { availableFilterValues } from '$lib/shared';

	import {
		selectedStackTags,
		selectedSpecialTags,
		selectedCities,
		resetSelectedTags
	} from '$lib/state.svelte';

	// Receive the companies data from the `load` function via +page.ts
	import type { PageData } from './$types';
	import FilterCheckboxes from '$lib/components/FilterCheckboxes.svelte';
	let { data }: { data: PageData } = $props();

	// TODO: move this to global state to import it into components
	// Initially, show all companies
	// let filteredCompanies = $state<Company[]>(data.companies);

	// this depends on $state of selectedStackTags, etc. - therefore dervice
	let filteredCompaniesResult = $derived(applySearchFilters());

	// Reactive state for selected tags
	let checkboxGroupsDiv: HTMLDivElement;

	function resetFilters() {
		resetSelectedTags();
	}

	// Apply the filters based on selected tags from all groups
	function applySearchFilters() {
		let filteredCompanies = [];

		console.log('applySearchFilters() triggered ...');
		if (selectedStackTags.get().length === 0) {
			// If no tags are selected, show all companies
			filteredCompanies = data.companies;
		} else {
			// Filter companies based on the combined stack tags
			filteredCompanies = data.companies.filter((company) =>
				selectedStackTags.get().every((tag) => company.stackTags.includes(tag))
			);
		}

		if (selectedSpecialTags.get().length > 0) {
			// Filter companies based on the special tags
			filteredCompanies = filteredCompanies.filter((company) =>
				selectedSpecialTags.get().every((tag) => company.specialTags.includes(tag))
			);
		}

		if (selectedCities.get().length > 0) {
			filteredCompanies = filteredCompanies.filter((company) =>
				selectedCities.get().every((city) => company.cities.includes(city))
			);
		}

		return filteredCompanies;
	}
</script>

<div class="checkbox-groups" bind:this={checkboxGroupsDiv}>
	<!-- TODO: use bind:group instead of toggleTag() - easier? -->

	<!-- {JSON.stringify(selectedStackTags.get())} -->
	<div>
		<h3>PHP CMSes</h3>
		<!-- {#each availablePhpCmses as { label, value }}
			<label>
				<input
					type="checkbox"
					{value}
					bind:group={selectedStackTags}
					onchange={applySearchFilters}
				/>
				{label}
			</label>
		{/each} -->
		<FilterCheckboxes
			labelsAndValues={availableFilterValues.phpCmses}
			stateVariable={selectedStackTags}
		/>
	</div>

	<div>
		<h3>JavaScript</h3>
		<FilterCheckboxes
			labelsAndValues={availableFilterValues.frontendFrameworks}
			stateVariable={selectedStackTags}
		/>
	</div>

	<div>
		<h3>Cities</h3>

		<FilterCheckboxes labelsAndValues={data.cityCounts} stateVariable={selectedCities} />
	</div>

	<div>
		<h3>PHP Frameworks</h3>
		<FilterCheckboxes
			labelsAndValues={availableFilterValues.phpFrameworks}
			stateVariable={selectedStackTags}
		/>
	</div>

	<div style="grid-column: span 2;">
		<h3>Specials</h3>

		<FilterCheckboxes
			labelsAndValues={availableFilterValues.specialTags}
			stateVariable={selectedSpecialTags}
		/>
	</div>
</div>

<!-- {JSON.stringify({
	selectedTags
})} -->

<div>
	<div class="resultCount">
		<p style="font-weight: bold;">{filteredCompaniesResult.length} companies found:</p>

		{#if selectedStackTags.get().length > 0 || selectedSpecialTags.get().length > 0}
			<div>
				<button in:fade={{ delay: 100 }} out:fade onclick={() => resetFilters()}
					>Reset filters</button
				>
			</div>
		{/if}
	</div>

	{#each filteredCompaniesResult as company (company.companyName)}
		<article>
			<h3>{company.companyName}</h3>
			<p>{company.teaser}</p>
			<p>
				<a href={company.websiteUrl} target="_blank"
					>Website <svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-box-arrow-up-right"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
						/>
						<path
							fill-rule="evenodd"
							d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
						/>
					</svg></a
				>
				| {#if company.devjobsProfileUrl != ''}<a href={company.devjobsProfileUrl} target="_blank"
						>devjobs.at Profile <svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-box-arrow-up-right"
							viewBox="0 0 16 16"
						>
							<path
								fill-rule="evenodd"
								d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
							/>
							<path
								fill-rule="evenodd"
								d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
							/>
						</svg>
					</a> |
				{/if}
				{company.cities.join(', ')} | {company.stackTags.join(', ')}
				{#if company.specialTags.includes('fourDayWorkWeek')}
					| 🪄 4 day work week (or similiar)
				{/if}
			</p>
		</article>
	{/each}
</div>

<style lang="scss">
	article {
		a {
			text-decoration: none;
		}
	}
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

	.resultCount {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		button {
			font-size: 1rem;
		}
	}
</style>
