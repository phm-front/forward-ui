import { createApp } from "vue";
import App from "./app.vue";
import ForwardUi from 'forward-ui';
// 引入element 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入全部组件样式
import './index.scss';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ForwardUi)
app.mount("#app");
