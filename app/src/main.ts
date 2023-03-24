import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./styles/ep.css";
import "doain/styles/index.scss";
import "./styles/index.scss";
import "uno.css";

// import "element-plus/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(store);

app.mount("#app");
