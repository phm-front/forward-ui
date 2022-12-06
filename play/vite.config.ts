import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'

export default defineConfig({
  // plugins: [vue()],
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
        // vueJsx: VueJsx(), // if needed
      },
    }),
  ],
})
