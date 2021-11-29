<template>
  <div :class="['border-4', 'p-4']">
    <div>{{label}}</div>
    <div>
      <span v-for="cls in clss" :key="cls">
        {{cls}}
      </span>
      </div>
    <div :class="clss">
      <Tree v-for="node in nodes" :key="node.label" :label="node.label"
      :nodes="node.nodes" :clss="node.clss"></Tree>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tree',
  props: {
    label: String, nodes: [], clss: []
  },
});
</script>

<style scoped>
</style>
