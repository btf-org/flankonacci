import { createApp, Plugin } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import { createStore } from "vuex";
import { node, Tree } from "./types";

const defaultState = () => {
  const idCount = 1;
  const root: node = {
    containerClasses: ["flex"],
    itemClasses: [],
    label: "root",
    children: [],
    depth: 0,
    id: idCount,
  };

  const tree = new Tree(root);
  return {
    tree: tree,
    idCount: idCount,
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
    deleteNode(state, id: number) {
      const parent = state.tree.findParent(id);
      console.log(parent);
      state.tree.deleteNode(id);
      if (parent.children.length == 0) {
        console.log(parent.containerClasses);
        parent.containerClasses = parent.containerClasses.filter(
          (e: string) => e != "flex-row" && e != "flex-col"
        );
      }
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
