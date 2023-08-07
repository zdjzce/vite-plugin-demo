import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { virtualModulePlugin } from './plugin'

export default defineConfig({
  plugins: [vue(),  virtualModulePlugin()],
})
