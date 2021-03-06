<template>
  <div id="app" class="flex flex-col">
    <div class="bg-purple-200 mb-4 shadow flex flex-row p-5 space-x-5">
      <button
        @click="exportHtml"
        type="button"
        class="
          inline-flex
          items-center
          px-4
          py-2
          border border-gray-300
          shadow-sm
          text-sm
          font-medium
          rounded-md
          text-gray-700
          bg-white
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
      >
        Export HTML
      </button>
      <SwitchGroup as="div" class="flex items-center">
        <Switch
          v-model="allowTailwindEditing"
          :class="[
            allowTailwindEditing ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          ]"
        >
          <span
            aria-hidden="true"
            :class="[
              allowTailwindEditing ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
            ]"
          />
        </Switch>
        <SwitchLabel as="span" class="ml-3">
          <span class="text-sm font-medium text-gray-900">Edit Tailwind</span>
        </SwitchLabel>
      </SwitchGroup>
      <SwitchGroup as="div" class="flex items-center">
        <Switch
          v-model="allowComponentAdding"
          :class="[
            allowComponentAdding ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          ]"
        >
          <span
            aria-hidden="true"
            :class="[
              allowComponentAdding ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
            ]"
          />
        </Switch>
        <SwitchLabel as="span" class="ml-3">
          <span class="text-sm font-medium text-gray-900">Add Components</span>
        </SwitchLabel>
      </SwitchGroup>
      <SwitchGroup as="div" class="flex items-center">
        <Switch
          v-model="allowDataEditing"
          :class="[
            allowDataEditing ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          ]"
        >
          <span
            aria-hidden="true"
            :class="[
              allowDataEditing ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
            ]"
          />
        </Switch>
        <SwitchLabel as="span" class="ml-3">
          <span class="text-sm font-medium text-gray-900"
            >Edit Component Data</span
          >
        </SwitchLabel>
      </SwitchGroup>
      <SwitchGroup as="div" class="flex items-center">
        <Switch
          v-model="inDesignMode"
          :class="[
            inDesignMode ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          ]"
        >
          <span
            aria-hidden="true"
            :class="[
              inDesignMode ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
            ]"
          />
        </Switch>
        <SwitchLabel as="span" class="ml-3">
          <span class="text-sm font-medium text-gray-900">Design Mode</span>
        </SwitchLabel>
      </SwitchGroup>
    </div>
    <Overlay :show="$store.state.overlayOpen" @close="closeOverlay"></Overlay>
    <Node :node="$store.state.tree.root"></Node>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import Overlay from "./Overlay.vue";
import Node from "./Node.vue";

export default defineComponent({
  name: "Home",
  components: {
    Node,
    Overlay,
    Switch,
    SwitchGroup,
    SwitchLabel,
  },
  // data() {
  //   return { overlayOpen: false };
  // },
  computed: {
    inDesignMode: {
      get() {
        // @ts-ignore
        return this.$store.state.inDesignMode;
      },
      set(value) {
        // @ts-ignore
        this.$store.commit("updateEditingMode", {
          var: "inDesignMode",
          newVal: value,
        });
        // this.$store.commit("updateInDesignMode", value);
      },
    },
    allowTailwindEditing: {
      get() {
        // @ts-ignore
        return this.$store.state.allowTailwindEditing;
      },
      set(value) {
        // @ts-ignore
        this.$store.commit("updateEditingMode", {
          var: "allowTailwindEditing",
          newVal: value,
        });
      },
    },
    allowComponentAdding: {
      get() {
        // @ts-ignore
        return this.$store.state.allowComponentAdding;
      },
      set(value) {
        // @ts-ignore
        this.$store.commit("updateEditingMode", {
          var: "allowComponentAdding",
          newVal: value,
        });
      },
    },
    allowDataEditing: {
      get() {
        // @ts-ignore
        return this.$store.state.allowDataEditing;
      },
      set(value) {
        // @ts-ignore
        this.$store.commit("updateEditingMode", {
          var: "allowDataEditing",
          newVal: value,
        });
      },
    },
  },
  methods: {
    exportHtml: function () {
      // @ts-ignore
      const html = this.$store.state.tree.exportHtml();
      alert(html);
    },
    closeOverlay: function () {
      // @ts-ignore
      this.$store.commit("updateOverlay", { open: false, compData: null });
    },
  },
});
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  height: -webkit-fill-available;
}
html {
  height: -webkit-fill-available;
  overflow-y: hidden !important;
}
body {
  height: -webkit-fill-available;
}
</style>
