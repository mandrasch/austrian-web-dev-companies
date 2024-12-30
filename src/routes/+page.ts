import type { PageLoad } from './$types';
import type { Company } from '$lib/types';

// TODO: or should we import it via json? https://rodneylab.com/sveltekit-json-import/

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/companies.json'); // Fetch the JSON file from static folder
	const companies: Company[] = await response.json(); // Cast to Company array

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

	// Convert cityCountMap to an array of objects and sort by count
	const cityCounts = Object.entries(cityCountMap)
		.map(([city, count]) => ({ label: city, value: city, count })) // Create an array of objects
		.sort((a, b) => b.count - a.count); // Sort by count in descending order

	return {
		companies,
		cityCounts
	};
};
