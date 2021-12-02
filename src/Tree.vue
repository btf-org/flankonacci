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
    <div :class="containerClasses">
      <Tree v-for="child in node.nodes" :key="child.label" :node="node"></Tree>
      <!-- <Tree
        v-for="child in node.nodes"
        :key="child.label"
        :label="child.label"
        :nodes="child.nodes"
        :containerClasses="child.containerClasses"
        :itemClasses="child.itemClasses"
        :node="node"
      ></Tree> -->
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
    // label: String,
    // nodes: [],
    // containerClasses: [],
    // itemClasses: [],
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
