import { createApp, Plugin } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import { createStore } from "vuex";
import { Tree } from "./types";

const defaultState = () => {
  return {
    tree: new Tree(),
    showMargins: true,
  };
};

const store = createStore({
  state: defaultState(),
  mutations: {
    addColumn(state, payload) {
      state.tree.addCol(payload.id);
    },
    addRow(state, payload) {
      state.tree.addRow(payload.id);
    },
    addChild(state, id: number) {
      state.tree.addChild(id);
    },
    deleteNode(state, id: number) {
      state.tree.delete(id);
    },
    // toggleMargin(state) {
    //   if(showMargins)
    // }
  },
});

const app = createApp(App);

const devtools: Plugin = {
  install(appl) {
    // @ts-ignore
    if (
      process.env.NODE_ENV === "development" &&
      // @ts-ignore
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__
    ) {
      // @ts-ignore
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = appl;
    }
  },
};
app.use(store);
app.use(devtools);
app.use(router).mount("#app");
