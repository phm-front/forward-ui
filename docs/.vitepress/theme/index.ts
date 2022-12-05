import ForwardUi from "forward-ui";
import DefaultTheme from "vitepress/theme"
import '@forward-ui/theme-chalk/src/index.scss'
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    app.use(ForwardUi);
  },
};

