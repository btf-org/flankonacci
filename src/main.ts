import { createApp, Plugin } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import { createStore } from "vuex";
import { node } from "./types";

const defaultState = () => {
  const idCount = 1;
  const tree: node = {
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
    id: idCount,
  };
  return {
    tree: tree,
    idCount: idCount,
    //  {
    //   containerClasses: [
    //     "text-red-500",
    //     "flex",
    //     "flex-row",
    //     "flex-1",
    //     "justify-center",
    //   ],
    //   itemClasses: [],
    //   label: "root",
    //   nodes: [],
    //   {
    //     itemClasses: ["flex-1"],
    //     containerClasses: [],
    //     label: "wee2",
    //     nodes: [
    //       {
    //         containerClasses: "font-bold",
    //         itemClasses: [],
    //         label: "wee3",
    //         nodes: [
    //           {
    //             itemClasses: [],
    //             containerClasses: [],
    //             label: "wee4",
    //             nodes: [],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     itemClasses: ["flex-1"],
    //     containerClasses: [],
    //     label: "wee2b",
    //     nodes: [],
    //   },
    // ],
    // },
  };
};

const store = createStore({
  state: defaultState(),
  mutations: {
    addChild(state) {
      state.idCount++;
      state.tree.nodes.push({
        label: "child",
        nodes: [],
        itemClasses: [],
        containerClasses: [],
        id: state.idCount,
      });
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
