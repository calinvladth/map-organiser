import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from "path"

export default defineConfig({
	resolve: {
		alias: {
			"$api": "./src/api",
			"$components": "./src/components",
			"$routes": "./src/routes",
			"$services": './src/services',
			"$stores": "./src/stores",
			"$utils": './src/utils',
			'@': path.resolve('./src'),
		},
	},
	plugins: [sveltekit()]
});
