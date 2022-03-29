import { render, createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

axios.defaults.baseURL = 'http://localhost:8000/api'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.use(VueSweetalert2)
app.config.globalProperties.$url = 'http://localhost:8000'
app.mount('#app')


