<script lang="ts">
	// stateVariable = the state which should be updated when checkboxes are selected,
	// important: use $bindable, otherwise this won't work
	let { labelsAndValues, statePropToBind = $bindable() } = $props();
</script>

{#each labelsAndValues as { label, value }}
	<label>
		<input type="checkbox" {value} bind:group={statePropToBind} />
		{label}
	</label>
{/each}
