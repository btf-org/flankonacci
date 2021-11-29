<template>
<div class="border-4 p-4">
  <div>{{label}}
    </div><button>Create</button>
  <Tree v-for="node in nodes" :key="node.label" :label="node.label"
  :nodes="node.nodes"></Tree>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tree',
  props: {
    label: String, nodes: []
  },
});
</script>

<style scoped>
</style>
