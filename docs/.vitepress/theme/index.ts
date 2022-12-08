import ForwardUi from 'forward-ui'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { globals } from '../vitepress'
import DefaultTheme from 'vitepress/theme'
import '@forward-ui/theme-chalk/src/index.scss'
import 'uno.css'

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    app.use(ForwardUi)

    // 注册icon
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

    // 注册自定义组件
    globals.forEach(([name, Component]) => {
      app.component(name, Component)
    })
  },
}
