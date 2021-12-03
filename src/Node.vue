<template>
  <div :class="['border-4', 'p-4'].concat(node.itemClasses)">
    <div>{{ node.label }}</div>
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
    <div v-if="node?.children.length == 0">
      <button @click="addRow">Add Row</button>
      <button @click="addColumn">Add Column</button>
    </div>
    <button v-if="node.depth > 0" @click="deleteNode">Delete</button>
    <div :class="node.containerClasses">
      <Node
        v-for="child in node.children"
        :key="child.label"
        :node="child"
      ></Node>
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
        itemClasses: ["flex"],
        parentContainerClasses: ["flex-col"],
      });
    },
    addRow() {
      // @ts-ignore
      this.$store.commit("addRow", {
        // @ts-ignore
        id: this.node.id,
        itemClasses: ["flex"],
        parentContainerClasses: ["flex-row"],
      });
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
