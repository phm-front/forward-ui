import { defineConfig } from 'vite'
// import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'

export default defineConfig({
  // plugins: [vue()],
  plugins: [
    VueMacros({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        vueJsx: vueJsx(),
      },
    }) as any,

    MarkdownTransform(),
  ],
  server: {
    port: 8080,
  },
})
