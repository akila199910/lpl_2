import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router';
import { Icon } from "@iconify/vue";



const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component('Icon', Icon);
app.mount('#app');