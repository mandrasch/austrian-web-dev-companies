<script lang="ts">
	// stateVariable = the state which should be updated when checkboxes are selected
	let { labelsAndValues, stateVariable } = $props();

	function handleChange(event: Event) {
		const inputEl = event.target as HTMLInputElement;

		if (inputEl.checked) {
			// TODO: check if already there
			stateVariable.selectedValues.push(inputEl.value);
			return;
		}

		stateVariable.selectedValues = stateVariable.selectedValues.filter(
			(currentValue: string) => currentValue !== inputEl.value
		);
	}
</script>

<!-- {JSON.stringify(selectedStackTags.get())} -->

{#each labelsAndValues as { label, value }}
	<label>
		<input type="checkbox" {value} onchange={handleChange} />
		{label}
	</label>
{/each}
