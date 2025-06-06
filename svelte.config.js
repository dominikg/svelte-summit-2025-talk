import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $assets: './src/assets',
      $slides: './src/slides.ts',
      '$internal/components': './src/app/components',
      '$internal/utils': './src/app/utils',
    },
    files: {
      params: './src/app/params',
      routes: './src/app/routes',
    },
  },
}

export default config
