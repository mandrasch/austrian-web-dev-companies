<script lang="ts">
	import { fade } from 'svelte/transition';

	import type { Company } from '$lib/types';

	// Receive the companies data from the `load` function via +page.ts
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	// Initially, show all companies
	let filteredCompanies = $state<Company[]>(data.companies);

	// SORT & FILTER

	// Available technologies to filter by
	const availablePhpCmses = [
		{ label: 'Craft CMS', value: 'craftcms' },
		{ label: 'Drupal', value: 'drupal' },
		{ label: 'Kirby CMS', value: 'kirbycms' },
		{ label: 'TYPO3', value: 'typo3' },
		{ label: 'WordPress', value: 'wordpress' }
	];

	// PHP frameworks
	const availablePhpFrameworks = [
		{ label: 'Laravel', value: 'laravel' },
		{ label: 'Symfony', value: 'symfony' }
	];

	// Frontend frameworks
	const availableFrontendFrameworks = [
		{ label: 'Vue', value: 'vue' },
		{ label: 'React', value: 'react' },
		{ label: 'Angular', value: 'angular' },
		{ label: 'Svelte', value: 'svelte' }
	];

	// Reactive state for selected tags
	let checkboxGroupsDiv: HTMLDivElement;
	let selectedTags = $state<string[]>([]);

	// Toggle function to manage selected tags for each group
	function toggleTag(toggledValue: string) {
		if (selectedTags.includes(toggledValue)) {
			selectedTags = selectedTags.filter((tag) => tag !== toggledValue);
		} else {
			selectedTags = [...selectedTags, toggledValue];
		}
		applySearchFilters();
	}

	function resetFilters() {
		selectedTags = [];
		applySearchFilters();

		// TODO: should we use checkbox value binding instead?
		Array.from(checkboxGroupsDiv.querySelectorAll('input[type="checkbox"]')).forEach((el: any) => {
			el.checked = false;
		});
	}

	// Apply the filters based on selected tags from all groups
	function applySearchFilters() {
		if (selectedTags.length === 0) {
			// If no tags are selected, show all companies
			filteredCompanies = data.companies;
		} else {
			// Filter companies based on the combined selected tags
			filteredCompanies = data.companies.filter((company) =>
				selectedTags.every((tag) => company.stackTags.includes(tag))
			);
		}

		// Sort the filtered companies by companyName (case-insensitive)
		filteredCompanies.sort((a, b) => {
			return a.companyName.localeCompare(b.companyName);
		});
	}
</script>

<div class="checkbox-groups" bind:this={checkboxGroupsDiv}>
	<!-- Checkbox group for filtering by Stack -->
	<div>
		<h3>PHP CMSes</h3>
		{#each availablePhpCmses as { label, value }}
			<label>
				<input type="checkbox" onchange={() => toggleTag(value)} />
				{label}
			</label>
		{/each}
	</div>

	<!-- Checkbox group for PHP frameworks -->
	<div>
		<h3>PHP Frameworks</h3>
		{#each availablePhpFrameworks as { label, value }}
			<label>
				<input type="checkbox" onchange={() => toggleTag(value)} />
				{label}
			</label>
		{/each}
	</div>

	<!-- Checkbox group for Frontend frameworks -->
	<div>
		<h3>Frontend</h3>
		{#each availableFrontendFrameworks as { label, value }}
			<label>
				<input type="checkbox" onchange={() => toggleTag(value)} />
				{label}
			</label>
		{/each}
	</div>
	<div>
		<h3>Zip Codes</h3>
		<small>Coming soon ...</small>
	</div>
</div>

<!-- {JSON.stringify({
	selectedTags
})} -->

<div>
	<div class="resultCount">
		<p style="font-weight: bold;">{filteredCompanies.length} companies found:</p>

		{#if selectedTags.length > 0}
			<div>
				<button in:fade={{ delay: 100 }} out:fade onclick={() => resetFilters()}
					>Reset filters</button
				>
			</div>
		{/if}
	</div>

	{#each filteredCompanies as company (company.companyName)}
		<article>
			<h3>{company.companyName}</h3>
			<p>{company.teaser}</p>
			<p>
				<a href={company.websiteUrl} target="_blank">Website</a> | {#if company.devjobsProfileUrl != ''}<a
						href={company.devjobsProfileUrl}
						target="_blank">devjobs.at Profile</a
					> |
				{/if} Zip: {company.zipCodes.join(', ')} | {company.stackTags.join(', ')}
			</p>
		</article>
	{/each}
</div>

<style lang="scss">
	.checkbox-groups {
		display: flex;
		flex-direction: row;
		gap: 1rem;

		h3 {
			font-size: 1rem;
		}
	}

	.resultCount {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		button {
			font-size: 1rem;
		}
	}
</style>
