<script lang="ts">
	// stateVariable = the state which should be updated when checkboxes are selected
	let { labelsAndValues, stateVariable } = $props();

	function handleChange(event: Event) {
		const inputEl = event.target as HTMLInputElement;

		if (inputEl.checked) {
			stateVariable.addTag(inputEl.value);
			return;
		}

		stateVariable.removeTag(inputEl.value);
	}
</script>

<!-- {JSON.stringify(selectedStackTags.get())} -->

{#each labelsAndValues as { label, value }}
	<label>
		<input type="checkbox" {value} onchange={handleChange} />
		{label}
	</label>
{/each}
