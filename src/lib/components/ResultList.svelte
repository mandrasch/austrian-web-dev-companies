<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import type { Company } from '$lib/types';
	import { building } from '$app/environment';

	// all JSON companies
	let { companiesData } = $props();

	// Listen for state changes
	// Apply the filters based on selected tags from all groups
	let results = $derived.by(() => {
		console.log('$derived.by triggered, filter results...');

		// start fresh
		let filteredCompanies: Company[] = [];
		filteredCompanies = companiesData;

		// very verbose here (again), but we keep it simple and readable here

		// Our source of thruth for state is building ? page.url.searchParams
		// TODO: move key names to const helper
		const selectedJsFrameworks = !building
			? page.url.searchParams.get('jsFrameworks')?.split(',') || []
			: [];
		const selectedPhpCmses = !building
			? page.url.searchParams.get('phpCmses')?.split(',') || []
			: [];
		const selectedPhpFrameworks = !building
			? page.url.searchParams.get('phpFrameworks')?.split(',') || []
			: [];
		const selectedCities = !building ? page.url.searchParams.get('cities')?.split(',') || [] : [];
		const selectedSpecialTags = !building
			? page.url.searchParams.get('specialTags')?.split(',') || []
			: [];
		const selectedSearchText = !building ? page.url.searchParams.get('s') || '' : '';

		// helper var for reset filters button
		const isFilterSet = [
			selectedJsFrameworks.length > 0,
			selectedPhpCmses.length > 0,
			selectedPhpFrameworks.length > 0,
			selectedCities.length > 0,
			selectedSpecialTags.length > 0,
			selectedSearchText !== ''
		].some(Boolean);

		const paginationState = {
			currentPage: parseInt(!building ? page.url.searchParams.get('p') || '1' : '1'),
			limit: 5
		};

		// Very verbose here, could be refactored - but keeping it simple here

		// stack tags
		if (selectedJsFrameworks.length > 0) {
			// Filter companies based on the combined stack tags
			filteredCompanies = filteredCompanies.filter((company: Company) =>
				selectedJsFrameworks.every((tag) => company.stackTags.includes(tag))
			);
		}
		if (selectedPhpCmses.length > 0) {
			// Filter companies based on the combined stack tags
			filteredCompanies = filteredCompanies.filter((company: Company) =>
				selectedPhpCmses.every((tag) => company.stackTags.includes(tag))
			);
		}
		if (selectedPhpFrameworks.length > 0) {
			// Filter companies based on the combined stack tags
			filteredCompanies = filteredCompanies.filter((company: Company) =>
				selectedPhpFrameworks.every((tag) => company.stackTags.includes(tag))
			);
		}

		// special tags
		if (selectedSpecialTags.length > 0) {
			// Filter companies based on the special tags
			filteredCompanies = filteredCompanies.filter((company: Company) =>
				selectedSpecialTags.every((tag) => company.specialTags.includes(tag))
			);
		}

		// cities
		if (selectedCities.length > 0) {
			filteredCompanies = filteredCompanies.filter((company: Company) =>
				selectedCities.every((city) => company.cities.includes(city))
			);
		}

		// search text
		if (selectedSearchText !== '') {
			const searchTextLower = selectedSearchText.toLowerCase();
			filteredCompanies = filteredCompanies.filter(
				(company: Company) =>
					company.companyName.toLowerCase().includes(searchTextLower) ||
					company.teaser.toLowerCase().includes(searchTextLower)
			);
		}

		/*console.log({ filteredCompanies });
		console.log({ paginationState });*/

		// Filtering is done, let's paginate!
		const startIndex = (paginationState.currentPage - 1) * paginationState.limit;
		const paginatedCompanies = filteredCompanies.slice(
			startIndex,
			startIndex + paginationState.limit
		);

		return {
			companies: paginatedCompanies,
			total: filteredCompanies.length,
			paginationState,
			isFilterSet
		};
	});

	function updateUrlForPaginationClick() {
		// Get the current search parameters from the URL,
		// set new current page for pagination
		const searchParams = !building ? page.url.searchParams : new URLSearchParams();
		searchParams.set('p', results.paginationState.currentPage.toString());
		goto(`?${searchParams.toString()}`);
	}

	function resetFilters() {
		goto(`/`);
	}
</script>

<div>
	<div class="resultCount">
		<p style="font-weight: bold;">
			{results.total} companies found / Page: {results.paginationState.currentPage}
		</p>

		{#if results.isFilterSet}
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
		{#if results.paginationState.currentPage > 1}
			<button
				onclick={() => {
					results.paginationState.currentPage--;
					updateUrlForPaginationClick();
				}}>Previous</button
			>
		{/if}
		{#if results.paginationState.currentPage * results.paginationState.limit < results.total}
			<button
				onclick={() => {
					results.paginationState.currentPage++;
					updateUrlForPaginationClick();
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
