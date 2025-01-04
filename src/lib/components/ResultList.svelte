<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Company } from '$lib/types';

	// TODO: add type hinting
	let { companiesData } = $props();

	// import shared state
	import {
		stackTagsState,
		specialTagsState,
		citiesState,
		resetSelectedTags
	} from '$lib/state.svelte';

	// Listen for state changes
	// Apply the filters based on selected tags from all groups
	let filteredCompaniesResult = $derived.by(() => {
		let filteredCompanies: Company[] = [];

		console.log('applySearchFilters() triggered ...');
		if (stackTagsState.selectedValues.length === 0) {
			// If no tags are selected, show all companies
			filteredCompanies = companiesData.companies;
		} else {
			// Filter companies based on the combined stack tags
			filteredCompanies = companiesData.companies.filter((company: Company) =>
				stackTagsState.selectedValues.every((tag) => company.stackTags.includes(tag))
			);
		}

		if (specialTagsState.selectedValues.length > 0) {
			// Filter companies based on the special tags
			filteredCompanies = filteredCompanies.filter((company: Company) =>
				specialTagsState.selectedValues.every((tag) => company.specialTags.includes(tag))
			);
		}

		if (citiesState.selectedValues.length > 0) {
			filteredCompanies = filteredCompanies.filter((company: Company) =>
				citiesState.selectedValues.every((city) => company.cities.includes(city))
			);
		}

		return filteredCompanies;
	});

	function resetFilters() {
		// reset state
		resetSelectedTags();
	}
</script>

<div>
	<div class="resultCount">
		<p style="font-weight: bold;">{filteredCompaniesResult.length} companies found:</p>

		{#if stackTagsState.selectedValues.length > 0 || specialTagsState.selectedValues.length > 0 || citiesState.selectedValues.length > 0}
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
