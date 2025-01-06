<script lang="ts">
	// TODO: is there a better pattern for this?

	let { label, stateProp = $bindable(), ...props } = $props();

	let inputEl: HTMLInputElement;

	// initial value on page load, passed down as prop
	let initialValue = stateProp;

	// TODO: if reset filters is clicked, this needs to be resetted as well

	// we use onchange here, otherwise $effect/go:to fire after each inputted character (with bind:value)
	function handleChange() {
		// update shared state
		stateProp = inputEl.value;
	}
</script>

<label>
	<input
		aria-label={label}
		type="text"
		value={initialValue}
		onchange={handleChange}
		bind:this={inputEl}
		{...props}
	/>
</label>

<style>
	label {
		margin-top: 10px;
	}
</style>
