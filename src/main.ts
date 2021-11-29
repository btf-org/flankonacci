import { createApp, Plugin } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import { createStore } from "vuex";

const defaultState = () => {
  return {
    tree: {
      clss: ["text-red-500", "flex", "flex-row", "flex-1", "justify-center"],
      label: "root",
      nodes: [
        {
          clss: ["flex-1"],
          label: "wee2",
          nodes: [
            {
              clss: "font-bold",
              label: "wee3",
              nodes: [{ clss: [], label: "wee4", nodes: [] }],
            },
          ],
        },
        { clss: ["flex-1"], label: "wee2b", nodes: [] },
      ],
    },
  };
};

const store = createStore({
  state: defaultState(),
  mutations: {},
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
