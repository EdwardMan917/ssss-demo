import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 1. Import the components you need
import { Button, Stepper, Toast } from 'vant';
// 2. Import the components style
import 'vant/lib/index.css';


const app = createApp(App);
app.use(Button);
app.use(Stepper);
app.use(Toast);
app.mount('#app');
