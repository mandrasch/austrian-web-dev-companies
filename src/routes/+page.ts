import type { PageLoad } from './$types';
import type { Company } from '$lib/types';

// Since this is a full static project, we do this client side - but
// this can be done in +page.server.ts as well (SSR / NodeJS hosting)

export const load: PageLoad = async ({ fetch, url }) => {
	// url parms
	const limit = parseInt(url.searchParams.get('l') || '5', 10);
	const currentPage = parseInt(url.searchParams.get('p') || '1', 10);

	const selectedPhpCmses = url.searchParams.get('phpCmses')?.split(',') || [];
	const selectedPhpFrameworks = url.searchParams.get('phpFrameworks')?.split(',') || [];
	const selectedJavaScriptFrameworks = url.searchParams.get('jsFrameworks')?.split(',') || [];
	const selectedSpecialTags = url.searchParams.get('specialTags')?.split(',') || [];
	const selectedCities = url.searchParams.get('cities')?.split(',') || [];
	const searchText = url.searchParams.get('s')?.toLowerCase() || '';

	// fetch JSON
	const response = await fetch('/companies.json'); // Fetch the JSON file from static folder
	let companies: Company[] = await response.json(); // Cast to Company array

	// Sort the filtered companies by companyName (case-insensitive)
	companies.sort((a, b) => {
		return a.companyName.localeCompare(b.companyName);
	});

	// Count cities and store them in an object
	const cityCountMap: Record<string, number> = {};
	companies.forEach((company) => {
		company.cities.forEach((city) => {
			// Increment the count for each city
			if (cityCountMap[city]) {
				cityCountMap[city]++;
			} else {
				cityCountMap[city] = 1;
			}
		});
	});

	// Convert cityCountMap to an array of objects and sort by count (we create the UI from it)
	const cityCounts = Object.entries(cityCountMap)
		.map(([city, count]) => ({ label: city, value: city, count })) // Create an array of objects
		.sort((a, b) => b.count - a.count); // Sort by count in descending order

	// Apply filters based on URL params

	if (selectedPhpCmses.length > 0) {
		companies = companies.filter((company) =>
			selectedPhpCmses.every((tag) => company.stackTags.includes(tag))
		);
	}

	if (selectedPhpFrameworks.length > 0) {
		companies = companies.filter((company) =>
			selectedPhpFrameworks.every((tag) => company.stackTags.includes(tag))
		);
	}

	if (selectedJavaScriptFrameworks.length > 0) {
		// Filter companies based on the combined stack tags
		companies = companies.filter((company: Company) =>
			selectedJavaScriptFrameworks.every((tag) => company.stackTags.includes(tag))
		);
	}

	if (selectedSpecialTags.length > 0) {
		// Filter companies based on the special tags
		companies = companies.filter((company: Company) =>
			selectedSpecialTags.every((tag) => company.specialTags.includes(tag))
		);
	}

	if (selectedCities.length > 0) {
		companies = companies.filter((company: Company) =>
			selectedCities.every((city) => company.cities.includes(city))
		);
	}

	if (searchText !== '') {
		const searchTextLower = searchText.toLowerCase();
		companies = companies.filter(
			(company: Company) =>
				company.companyName.toLowerCase().includes(searchTextLower) ||
				company.teaser.toLowerCase().includes(searchTextLower)
		);
	}

	// Filtering is done, let's paginate!
	const startIndex = (currentPage - 1) * limit;
	const paginatedCompanies = companies.slice(startIndex, startIndex + limit);

	return {
		// data for UI selection of cities:
		cityCounts,
		// our filtered results:
		companies: paginatedCompanies,
		// pagination data:
		total: companies.length,
		limit,
		currentPage,
		// TODO: is there an easier way? just use url from $stores/page?
		url
	};
};
