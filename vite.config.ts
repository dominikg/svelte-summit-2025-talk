import { sveltekit } from '@sveltejs/kit/vite'
import ssl from '@vitejs/plugin-basic-ssl'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [ssl({ name: 'test', certDir: '.certs', domains: ['localhost'] }), sveltekit()],
  server: { proxy: {} }, //proxy is needed to downgrade ssl to tls http 1.1 as http/2 would mess with sveltekit
})
