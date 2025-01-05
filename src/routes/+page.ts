import type { PageLoad } from './$types';
import type { Company } from '$lib/types';

// Since this is a full static project, we do this client side - but
// this can be done in +page.server.ts as well (SSR / NodeJS hosting)

export const load: PageLoad = async ({ fetch }) => {
	// TODO: we could do this in onMount as well?
	// fetch JSON
	const response = await fetch('/companies.json'); // Fetch the JSON file from static folder
	let companies: Company[] = await response.json(); // Cast to Company array

	// Sort the filtered companies by companyName (case-insensitive)
	companies = companies.sort((a, b) => {
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

	return {
		// data for UI selection of cities, based on cities in data:
		cityCounts,
		// company data, ordered A-Z
		companies
	};
};
