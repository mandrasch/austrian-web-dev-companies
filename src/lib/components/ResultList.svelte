<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import type { Company } from '$lib/types';

	// all JSON companies
	let { companiesData } = $props();
	let total = 0;

	// import shared state
	import {
		stackTagsState,
		specialTagsState,
		citiesState,
		searchTextState,
		paginationState,
		resetSelectedTags
	} from '$lib/state.svelte';

	// Listen for state changes
	// Apply the filters based on selected tags from all groups
	let results = $derived.by(() => {
		console.log('applySearchFilters() triggered ...');

		// start fresh
		let filteredCompanies: Company[] = [];
		filteredCompanies = companiesData;

		// Very verbose here, could be refactored - but keeping it simple here

		if (stackTagsState.selectedJavaScriptFrameworks.length > 0) {
			// Filter companies based on the combined stack tags
			filteredCompanies = filteredCompanies.filter((company: Company) =>
				stackTagsState.selectedJavaScriptFrameworks.every((tag) => company.stackTags.includes(tag))
			);
		}

		if (stackTagsState.selectedPhpCmses.length > 0) {
			// Filter companies based on the combined stack tags
			filteredCompanies = filteredCompanies.filter((company: Company) =>
				stackTagsState.selectedPhpCmses.every((tag) => company.stackTags.includes(tag))
			);
		}

		if (stackTagsState.selectedPhpFrameworks.length > 0) {
			// Filter companies based on the combined stack tags
			filteredCompanies = filteredCompanies.filter((company: Company) =>
				stackTagsState.selectedPhpFrameworks.every((tag) => company.stackTags.includes(tag))
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

		if (searchTextState.text !== '') {
			const searchTextLower = searchTextState.text.toLowerCase();
			filteredCompanies = filteredCompanies.filter(
				(company: Company) =>
					company.companyName.toLowerCase().includes(searchTextLower) ||
					company.teaser.toLowerCase().includes(searchTextLower)
			);
		}

		console.log({ filteredCompanies });
		console.log({ paginationState });

		// Filtering is done, let's paginate!
		const startIndex = (paginationState.currentPage - 1) * paginationState.limit;
		const paginatedCompanies = filteredCompanies.slice(
			startIndex,
			startIndex + paginationState.limit
		);

		return { companies: paginatedCompanies, total: filteredCompanies.length };
	});

	// TODO:

	/* TOOD: use pagination state
	
	*/

	function updateUrl() {
		// Get the current search parameters from the URL, set new current page for pagination
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set('p', paginationState.currentPage.toString());
		goto(`?${searchParams.toString()}`, { replaceState: true });
	}

	function resetFilters() {
		resetSelectedTags();
	}
</script>

<div>
	<div class="resultCount">
		<p style="font-weight: bold;">{results.total} companies found:</p>

		<!-- TODO find easier way to check if filters are set, derived? -->
		{#if stackTagsState.selectedJavaScriptFrameworks.length > 0 || stackTagsState.selectedPhpCmses.length > 0 || stackTagsState.selectedPhpFrameworks.length > 0 || specialTagsState.selectedValues.length > 0 || citiesState.selectedValues.length > 0 || searchTextState.text != ''}
			<div>
				<button in:fade={{ delay: 100 }} out:fade onclick={() => resetFilters()}
					>Reset filters</button
				>
			</div>
		{/if}
	</div>

	{#each results.companies as company (company.companyName)}
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
				| {#if company.devjobsAtIdentifier != ''}
					<a
						href={`https://devjobs.at/jobs/search?company=${company.devjobsAtIdentifier}`}
						target="_blank"
						>devjobs.at Jobs <svg
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
					</a>

					|

					<a href={`https://devjobs.at/team/${company.devjobsAtIdentifier}`} target="_blank"
						>devjobs.at Team <svg
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
				{#if company.specialTags.includes('fourDayWorkWeekOrSimiliar')}
					| 🪄 4 day work week (or similiar)
				{/if}
			</p>
		</article>
	{/each}

	<div class="pagination">
		{#if paginationState.currentPage > 1}
			<button
				onclick={() => {
					paginationState.currentPage--;
					updateUrl();
				}}>Previous</button
			>
		{/if}
		{#if paginationState.currentPage * paginationState.limit < results.total}
			<button
				onclick={() => {
					paginationState.currentPage++;
					updateUrl();
				}}>Next</button
			>
		{/if}
	</div>
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
