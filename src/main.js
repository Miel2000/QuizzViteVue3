import { createApp, provide } from 'vue'
import './style.scss'
import App from './App.vue'
import { store } from '../src/store/store.js'


const myApp = createApp(App)


myApp.provide("STORE", store);

myApp.mount('#app')
