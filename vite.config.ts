import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueDevtools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vueDevtools(),
    vue(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      outDir: 'dist',
    }),
  ],
  server: {
    configureServer(server) {
      server.middlewares.use('/api/sexes', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ 'male': 'male', 'female': 'female' }))
      })
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DynamicUI',
      fileName: 'dynamic-ui',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        },
      },
    },
  },
})
