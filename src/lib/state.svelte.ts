// If you want to use it as import, you need to wrap the array into an Object
export const stackTagsState = $state({ selectedValues: [] });
export const specialTagsState = $state({ selectedValues: [] });
export const citiesState = $state({ selectedValues: [] });

export function resetSelectedTags() {
	stackTagsState.selectedValues = [];
	specialTagsState.selectedValues = [];
	citiesState.selectedValues = [];
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
