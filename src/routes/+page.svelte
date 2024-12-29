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
		{ label: 'Craft CMS', value: 'CraftCMS' },
		{ label: 'Drupal', value: 'Drupal' },
		{ label: 'Kirby CMS', value: 'KirbyCMS' },
		{ label: 'TYPO3', value: 'TYPO3' },
		{ label: 'WordPress', value: 'WordPress' }
	];

	// PHP frameworks
	const availablePhpFrameworks = [
		{ label: 'Laravel', value: 'Laravel' },
		{ label: 'Symfony', value: 'Symfony' }
	];

	// Frontend frameworks
	const availableFrontendFrameworks = [
		{ label: 'Angular', value: 'Angular' },
		{ label: 'React', value: 'React' },
		{ label: 'Svelte', value: 'Svelte' },
		{ label: 'Vue', value: 'Vue' }
	];

	const availableSpecialTags = [
		{ label: '4 day work week (or similiar)', value: 'fourDayWorkWeek' }
	];

	// Reactive state for selected tags
	let checkboxGroupsDiv: HTMLDivElement;
	let selectedStackTags = $state<string[]>([]);
	let selectedSpecialTags = $state<string[]>([]);

	// TODO: use enum with 'stack' and 'special'
	// Toggle function to manage selected tags for each group
	function toggleTag(toggledValue: string, type: string) {
		// TODO: refactor with better solution

		if (type === 'stack') {
			if (selectedStackTags.includes(toggledValue)) {
				selectedStackTags = selectedStackTags.filter((tag) => tag !== toggledValue);
			} else {
				selectedStackTags = [...selectedStackTags, toggledValue];
			}
		}

		if (type === 'special') {
			if (selectedSpecialTags.includes(toggledValue)) {
				selectedSpecialTags = selectedSpecialTags.filter((tag) => tag !== toggledValue);
			} else {
				selectedSpecialTags = [...selectedSpecialTags, toggledValue];
			}
		}

		applySearchFilters();
	}

	function resetFilters() {
		selectedStackTags = [];
		selectedSpecialTags = [];
		applySearchFilters();

		// TODO: should we use checkbox value binding instead?
		Array.from(checkboxGroupsDiv.querySelectorAll('input[type="checkbox"]')).forEach((el: any) => {
			el.checked = false;
		});
	}

	// Apply the filters based on selected tags from all groups
	function applySearchFilters() {
		if (selectedStackTags.length === 0) {
			// If no tags are selected, show all companies
			filteredCompanies = data.companies;
		} else {
			// Filter companies based on the combined stack tags
			filteredCompanies = data.companies.filter((company) =>
				selectedStackTags.every((tag) => company.stackTags.includes(tag))
			);
		}

		if (selectedSpecialTags.length > 0) {
			// Filter companies based on the special tags
			filteredCompanies = filteredCompanies.filter((company) =>
				selectedSpecialTags.every((tag) => company.specialTags.includes(tag))
			);
		}
	}
</script>

<div class="checkbox-groups" bind:this={checkboxGroupsDiv}>
	<!-- Checkbox group for filtering by Stack -->
	<div>
		<h3>PHP CMSes</h3>
		{#each availablePhpCmses as { label, value }}
			<label>
				<input type="checkbox" onchange={() => toggleTag(value, 'stack')} />
				{label}
			</label>
		{/each}
	</div>

	<!-- Checkbox group for PHP frameworks -->
	<div>
		<h3>PHP Frameworks</h3>
		{#each availablePhpFrameworks as { label, value }}
			<label>
				<input type="checkbox" onchange={() => toggleTag(value, 'stack')} />
				{label}
			</label>
		{/each}
	</div>

	<!-- Checkbox group for Frontend frameworks -->
	<div>
		<h3>JavaScript</h3>
		{#each availableFrontendFrameworks as { label, value }}
			<label>
				<input type="checkbox" onchange={() => toggleTag(value, 'stack')} />
				{label}
			</label>
		{/each}
	</div>

	<div style="grid-column: span 2;">
		<h3>Specials</h3>
		{#each availableSpecialTags as { label, value }}
			<label>
				<input type="checkbox" onchange={() => toggleTag(value, 'special')} />
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

		{#if selectedStackTags.length > 0 || selectedSpecialTags.length > 0}
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
				{/if} Zip: {company.zipCodes.join(', ')} | {company.stackTags.join(', ')}
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
