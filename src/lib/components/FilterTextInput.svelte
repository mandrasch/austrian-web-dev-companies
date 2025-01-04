<script lang="ts">
	let {
		label,
		// statePropToBind = the state which should be updated when checkboxes are selected,
		// important: use $bindable, otherwise this won't work
		statePropToBind = $bindable(),
		...props
	} = $props();
</script>

<label>
	<input aria-label={label} type="text" bind:value={statePropToBind} {...props} />
</label>

<style>
	label {
		margin-top: 10px;
	}
</style>
