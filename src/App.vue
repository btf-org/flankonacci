<template>
  <div id="app">
    <div><button @click="exportHtml">Export HTML</button></div>
    <Node :node="$store.state.tree.root"></Node>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Node from "./Node.vue";

export default defineComponent({
  name: "Home",
  components: {
    Node,
  },
  methods: {
    exportHtml: function () {
      // @ts-ignore
      const html = this.$store.state.tree.exportHtml();
      alert(html);
    },
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
