import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "uno.css";
import "doain/styles/index.scss";
import "./styles/ep.css";
import "./styles/index.scss";

// import "element-plus/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
});
app.mount("#app");
