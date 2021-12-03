<template>
  <div
    :class="
      [{ 'm-4': $store.state.showMargins }].concat(
        Array.from(new Set([...node.itemClasses, ...node.formattingClasses]))
      )
    "
  >
    <div>
      Items:
      <span v-for="cls in node.itemClasses.values()" :key="cls">
        {{ cls }}
      </span>
    </div>
    <div>
      Parent:
      <span v-for="cls in node.containerClasses.values()" :key="cls">
        {{ cls }}
      </span>
    </div>
    <div v-if="node?.children.length == 0">
      <button @click="addRow">Add Row</button>
      <button @click="addColumn">Add Column</button>
    </div>
    <button v-if="node.depth > 0" @click="deleteNode">Delete</button>
    <div
      v-if="node.children.length > 0"
      :class="Array.from(node.containerClasses)"
    >
      <Node v-for="child in node.children" :key="child.id" :node="child"></Node>
      <button @click="addChild">Add Child</button>
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
    addColumn() {
      // @ts-ignore
      this.$store.commit("addColumn", {
        // @ts-ignore
        id: this.node.id,
      });
    },
    addRow() {
      // @ts-ignore
      this.$store.commit("addRow", {
        // @ts-ignore
        id: this.node.id,
      });
    },
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
