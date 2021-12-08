import { createApp, Plugin } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import { createStore } from "vuex";
import { Tree } from "./types";

const defaultState = () => {
  return {
    tree: new Tree(),
    inDesignMode: true,
    allowTailwindEditing: true,
    allowComponentAdding: true,
    allowDataEditing: true,
    staticDataEditing: true,
    overlayOpen: false,
    overlayData: null,
    overlayId: 0,
    overlayf: () => null,
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
    // updateInDesignMode(state, value: boolean) {
    //   state.inDesignMode = value;
    // },
    updateEditingMode(state, payload) {
      // @ts-ignore
      state[payload.var] = payload.newVal;
    },
    updateClasses(state, payload) {
      state.tree.updateClasses(payload.id, payload.classes, payload.list);
    },
    updateComponent(state, payload) {
      state.tree.updateComponent(
        payload.id,
        payload.comp,
        payload.compData,
        payload.compf
      );
    },
    updateOverlay(state, payload) {
      state.overlayOpen = payload.open;
      if (payload.open) {
        state.overlayData = payload.compData;
        state.overlayf = payload.compf;
        state.overlayId = payload.id;
      }
    },
    updateComponentData(state, payload) {
      state.tree.updateComponentData(payload.id, payload.compData);
    },
    updateComponentf(state, payload) {
      state.tree.updateComponentf(payload.id, payload.compf);
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
