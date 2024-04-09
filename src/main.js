import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// import {createPinia} from "pinia";

const app = createApp(App);
// const pinia = createPinia();

app.use(router);
// app.use(pinia)
app.use(Toast)
app.mount("#app");
