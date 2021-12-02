<template>
  <div id="app">
    <Tree :node="$store.state.tree"></Tree>
    <!-- <Tree
      :label="$store.state.tree.label"
      :nodes="$store.state.tree.nodes"
      :containerClasses="$store.state.tree.containerClasses"
      :itemClasses="$store.state.tree.itemClasses"
      :node="$store.state.tree"
    ></Tree> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tree from "./Tree.vue";

export default defineComponent({
  name: "Home",
  components: {
    Tree,
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
