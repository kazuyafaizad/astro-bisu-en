// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
	// Comment out "renderers: []" to enable Astro's default component support.
	renderers: [],
	devOptions: {
    hostname: '0.0.0.0',  // The hostname to run the dev server on.
		// port: 3000,             // The port to run the dev server on.
	}
});
