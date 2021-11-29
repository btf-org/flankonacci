import { createApp } from 'vue'
// import Vue from "vue";
import App from './App.vue'
// import Tree from '@/components/Tree.vue'
import router from './router'
import "./index.css";

import { createStore } from "vuex";

const defaultState = () => {
	return {
		count: 0,
	};
};

// Create a new store instance.
const store = createStore({
  state: defaultState(),
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

const app = createApp(App);
app.use(router).mount('#app')

// Install the store instance as a plugin
app.use(store);
