<template>
  <div :class="['border-4', 'p-4'].concat(node.itemClasses)">
    <div>{{ node.label }}</div>
    <button @click="addChild">Add Child</button>
    <button v-if="node.depth > 0" @click="deleteNode">Delete</button>
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
      <Node v-for="child in node.nodes" :key="child.label" :node="child"></Node>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { node } from "./types";

export default defineComponent({
  name: "Node",
  props: {
    node: Object as () => node,
  },
  methods: {
    addChild() {
      // @ts-ignore
      this.$store.commit("addChild", this.node.id);
    },
    deleteNode() {
      // @ts-ignore
      this.$store.commit("deleteNode", this.node.id);
    },
  },
});
</script>

<style scoped>
</style>
