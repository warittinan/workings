import { createApp } from 'vue'
import App from './App.vue'
import Login from "./components/Login.vue"
import router from "./Router/index.js"
import{createPinia} from'pinia'
import './assets/main.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from '@vueup/vue-quill'

createApp(App).use(router).use(createPinia()).component('QuillEditor',QuillEditor).mount('#app')
