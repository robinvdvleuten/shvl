import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: ['src/index.js'],
	format: ['esm', 'cjs'],
	platform: 'neutral',
	minify: true,
	sourcemap: false,
	dts: false,
	clean: true,
})
