import { createApp } from "vue";
// 引入全部组件样式
import '@forward-ui/theme-chalk/src/index.scss';
import App from "./app.vue";

const app = createApp(App);

app.mount("#app");
