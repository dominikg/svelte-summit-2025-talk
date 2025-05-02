import { defineConfig } from 'vite'
export default defineConfig({
  server: {
    hmr: {
      /*...*/
    },
  },
  optimizeDeps: {
    /*prebundling options*/
  },
  plugins: [
    {
      name: 'my-hmr-plugin',
      configureServer(server) {
        /*add your own middlewares*/
      },
      handleHotUpdate() {
        /*customize update behavior*/
      },
    },
  ],
})
