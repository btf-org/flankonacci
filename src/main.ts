import { createApp, Plugin } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import { createStore } from "vuex";
import { node, Tree } from "./types";

const defaultState = () => {
  const idCount = 1;
  const root: node = {
    containerClasses: [
      "text-red-500",
      "flex",
      "flex-row",
      "flex-1",
      "justify-center",
    ],
    itemClasses: [],
    label: "root",
    nodes: [],
    depth: 0,
    id: idCount,
  };

  const tree = new Tree(root);
  // const nodeLookup: { [key: number]: node } = {
  //   1: tree,
  // };
  return {
    tree: tree,
    idCount: idCount,
    // nodeLookup: nodeLookup,
  };
};

const store = createStore({
  state: defaultState(),
  mutations: {
    addChild(state, id: number) {
      state.tree.addChild(id);
    },
    deleteNode(state, id: number) {
      state.tree.deleteNode(id);
    },
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
