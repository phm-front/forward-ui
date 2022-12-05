import { createApp } from "vue";
import App from "./app.vue";
import ForwardUi from 'forward-ui';

// 引入全部组件样式
import './index.scss';

const app = createApp(App);
app.use(ForwardUi)
app.mount("#app");
