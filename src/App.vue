<template>
  <div id="app" class="flex flex-col">
    <div class="bg-purple-200 mb-4 shadow flex flex-row p-5 space-x-5">
      <button @click="exportHtml">Export HTML</button>
      <SwitchGroup as="div" class="flex items-center">
        <Switch
          v-model="showMargins"
          :class="[
            showMargins ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          ]"
        >
          <span
            aria-hidden="true"
            :class="[
              showMargins ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
            ]"
          />
        </Switch>
        <SwitchLabel as="span" class="ml-3">
          <span class="text-sm font-medium text-gray-900">Show Margins?</span>
        </SwitchLabel>
      </SwitchGroup>
    </div>
    <Node :node="$store.state.tree.root"></Node>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

import Node from "./Node.vue";

export default defineComponent({
  name: "Home",
  components: {
    Node,
    Switch,
    SwitchGroup,
    SwitchLabel,
  },
  computed: {
    showMargins: {
      get() {
        // @ts-ignore
        return this.$store.state.showMargins;
      },
      set(value) {
        // @ts-ignore
        this.$store.commit("updateShowMargins", value);
      },
    },
  },
  methods: {
    exportHtml: function () {
      // @ts-ignore
      const html = this.$store.state.tree.exportHtml();
      alert(html);
    },
    alert: function () {
      alert("hi");
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
