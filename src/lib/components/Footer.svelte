<footer>
	<p>
		Hobby project - made with Svelte v5, SvelteKit and Simple.css ✨ (<a
			href="https://github.com/mandrasch/austrian-web-dev-companies">Source Code</a
		>)
	</p>
	<div class="footer-grid">
		<p>
			Another company is missing? <a
				href="https://github.com/mandrasch/austrian-web-dev-companies?tab=readme-ov-file#add-or-remove-a-company"
				>Add (or remove) a company</a
			>
		</p>
		<p>
			This site doesn't process any personal data.
			<a href="https://matthias-andrasch.eu/impressum-datenschutz/">Imprint & Privacy</a>
		</p>

		<p>
			Created by <a href="https://mandrasch.dev">Matthias Andrasch</a>. Find more teams on
			<a href="https://devjobs.at/teams/search">devjobs.at</a>.
		</p>
	</div>
</footer>

<style lang="css">
	footer {
		padding: 20px;
		container-type: inline-size;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr; /* Three equal columns */
		column-gap: 1rem;
		row-gap: 1rem; /* Gap between rows */
	}

	/* Container query for mobile */
	@container (max-width: 480px) {
		.footer-grid {
			grid-template-columns: 1fr; /* Stack items in one column on mobile */
		}
	}
</style>
