import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from './routes/index.js';
import 'element-plus/dist/index.css'
import './style.css'
import store from './store/index.js';
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(router);
app.use(store);
app.mount('#app')
