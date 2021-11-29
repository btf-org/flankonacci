import { createApp, Plugin } from 'vue'
import App from './App.vue'
import router from './router'
import "./index.css";

import { createStore } from "vuex";

const defaultState = () => {
	return {
		tree: {label: "root", nodes: [{label: "wee2", nodes: [{label: "wee3", nodes: [{label: "wee4", nodes: []}]}]}, {label: 'wee2b', 'nodes': []}]}

	};
};

const store = createStore({
  state: defaultState(),
  mutations: {
  },
});

const app = createApp(App);

const devtools: Plugin = {
	install(appl) {
		// @ts-ignore
		if (process.env.NODE_ENV === 'development' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
			// @ts-ignore
			window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = appl;
		}
	},
};
app.use(store);
app.use(devtools);
app.use(router).mount('#app')