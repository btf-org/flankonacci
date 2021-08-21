<template>
  <div>{{label}}
    </div>
  <Tree v-for="node in nodes" :key="node.label" :label="node.label"></Tree>
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
