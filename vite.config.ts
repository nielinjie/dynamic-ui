import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueDevtools from 'vite-plugin-vue-devtools'

function mockApiPlugin() {
  return {
    name: 'mock-api',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url === '/api/sexes' || req.url?.startsWith('/api/sexes?')) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify([
            { value: 'male', name: 'Male' },
            { value: 'female', name: 'Female' },
          ]))
          return
        }
        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      mockApiPlugin(),
      vueDevtools(),
      vue(),
      dts({
        tsconfigPath: './tsconfig.app.json',
        outDir: 'dist',
      }),
    ],
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
  }
})
