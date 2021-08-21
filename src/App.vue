<template>
  <div id="app">
  <Tree :label="tree.label" :nodes="tree.nodes"></Tree>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tree from '@/components/Tree.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Tree,
  },
  data: function(){
    return {
      tree: {label: "root", nodes: [{label: "wee2", nodes: [{label: "wee3", nodes: [{label: "wee4", nodes: []}]}]}]}
    }
  }
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
