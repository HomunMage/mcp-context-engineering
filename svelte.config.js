// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),

		// ✅ Important: fix base path for GitHub Pages subdirectory
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/demo' : ''
		},

		// optional, but ensures SvelteKit app files stay in a predictable dir
		appDir: '_app'
	}
};

export default config;
