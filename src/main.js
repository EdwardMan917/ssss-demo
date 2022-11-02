import { createApp } from "vue";
import "./style.less";
import App from "./App.vue";
import { Button, Stepper, Toast } from "vant";
import "vant/lib/index.css";
import router from "./router";


const app = createApp(App);
app.use(router);
app.use(Button);
app.use(Stepper);
app.use(Toast);
app.mount('#app');
