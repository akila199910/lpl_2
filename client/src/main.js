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
console.log("Mode:", import.meta.env.MODE);
console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
console.log("Socket URL:", import.meta.env.VITE_SOCKET_URL);