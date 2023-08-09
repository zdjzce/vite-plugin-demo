import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { virtualModulePlugin } from './plugin'
import svgLoader from './plugin-svg'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue(),  virtualModulePlugin(), svgLoader()],
})