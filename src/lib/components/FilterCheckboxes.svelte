<script lang="ts">
	let {
		labelsAndValues,
		// statePropToBind = the state which should be updated when checkboxes are selected,
		// important: use $bindable, otherwise this won't work
		statePropToBind = $bindable()
	} = $props();
</script>

{#each labelsAndValues as { label, value }}
	<label>
		<input type="checkbox" {value} bind:group={statePropToBind} />
		{label}
	</label>
{/each}
