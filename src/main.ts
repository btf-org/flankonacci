import { createApp } from 'vue'
// import Vue from "vue";
import App from './App.vue'
// import Tree from '@/components/Tree.vue'
import router from './router'
import "./index.css";

createApp(App).use(router).mount('#app')
