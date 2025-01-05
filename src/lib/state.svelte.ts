// See https://dev.to/mandrasch/svelte-5-share-state-between-components-for-dummies-4gd2

// Tag based states
// If you want to use it as import, you need to wrap the array into an Object
export const stackTagsState = $state({
	// we need to split it in order to use bind:group (https://github.com/sveltejs/svelte/issues/2308)
	selectedPhpCmses: [] as string[],
	selectedPhpFrameworks: [] as string[],
	selectedJavaScriptFrameworks: [] as string[]
});

export const specialTagsState = $state({ selectedValues: [] as string[] });
export const citiesState = $state({ selectedValues: [] as string[] });

// Text state
export const searchTextState = $state({ text: '' });

export function resetSelectedTags() {
	stackTagsState.selectedPhpCmses = [];
	stackTagsState.selectedPhpFrameworks = [];
	stackTagsState.selectedJavaScriptFrameworks = [];
	specialTagsState.selectedValues = [];
	citiesState.selectedValues = [];
	searchTextState.text = '';
}

// You could also use a custom class to centralize logic parts, not done here for simplicity
// https://joyofcode.xyz/how-to-share-state-in-svelte-5#using-classes-for-reactive-state
// Svelte 5 - Global $state with classes https://www.youtube.com/watch?v=9MbjQJMwQsQ
/*class SelectedTags {
	#tags: Array<string> = $state([]);

	// TODO: can this boilerplate code somehow be avoided?
	get() {
		return this.#tags;
	}
	addTag(tag: string) {
		this.#tags.push(tag);
	}
	removeTag(tag: string) {
		this.#tags = this.#tags.filter((value) => {
			if (value === tag) {
				return false;
			}
			return true;
		});
	}

	reset() {
		this.#tags = [];
	}
}
// we need it multiple times
export const selectedStackTags = new SelectedTags();
export const selectedSpecialTags = new SelectedTags();
export const selectedCities = new SelectedTags();
*/
