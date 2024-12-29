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

	return {
		companies // Return the companies array as part of the data
	};
};
