<template>
  <div :class="['border-4', 'p-4'].concat(node.itemClasses)">
    <div>{{ node.label }}</div>
    <button @click="addChild">Add Child</button>
    <div>
      Items:
      <span v-for="cls in node.itemClasses" :key="cls">
        {{ cls }}
      </span>
    </div>
    <div>
      Parent:
      <span v-for="cls in node.containerClasses" :key="cls">
        {{ cls }}
      </span>
    </div>
    <div :class="node.containerClasses">
      <Tree v-for="child in node.nodes" :key="child.label" :node="child"></Tree>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { node } from "./types";

export default defineComponent({
  name: "Tree",
  props: {
    node: Object as () => node,
  },
  methods: {
    addChild() {
      // @ts-ignore
      this.$store.commit("addChild");
    },
  },
});
</script>

<style scoped>
</style>
