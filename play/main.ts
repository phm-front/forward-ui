import { createApp } from 'vue'
import ForwardUi from 'forward-ui'
// 引入element 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入全部组件样式
import './index.scss'

;(async () => {
  const apps = import.meta.glob<{ [key: string]: any }>('./src/*.vue')
  const name = location.pathname.replace(/^\//, '') || 'app'
  const file = apps[`./src/${name}.vue`]
  if (!file) {
    location.pathname = 'app'
    return
  }
  const App = (await file()).default
  const app = createApp(App)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  // 注册全部组件
  app.use(ForwardUi)
  app.mount('#app')
})()
