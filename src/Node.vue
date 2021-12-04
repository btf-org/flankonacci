<template>
  <div
    :class="
      [{ 'm-4': $store.state.showMargins }, 'relative'].concat(
        Array.from(new Set([...node.itemClasses, ...node.formattingClasses]))
      )
    "
  >
    <div class="absolute top-0 right-0">
      <button v-if="node.depth > 0" @click="deleteNode">
        <XIcon class="h-5 w-5" />
      </button>
    </div>
    <div
      v-if="$store.state.showClasses"
      class="font-mono absolute top-0 left-0"
    >
      <div>Item: {{ Array.from(node.itemClasses).join(" ") }}</div>
      <div v-if="node?.children.length > 0">
        Parent: {{ Array.from(node.containerClasses).join(" ") }}
      </div>
    </div>
    <div class="flex flex-row justify-center" v-if="node?.children.length == 0">
      <button @click="addRow"><DotsHorizontalIcon class="h-5 w-5" /></button>
      <button @click="addColumn"><DotsVerticalIcon class="h-5 w-5" /></button>
    </div>
    <div
      v-if="node.children.length > 0"
      :class="Array.from(node.containerClasses)"
    >
      <Node v-for="child in node.children" :key="child.id" :node="child"></Node>
      <div>
        <button @click="addChild"><PlusCircleIcon class="h-5 w-5" /></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { node } from "./types";
import {
  XIcon,
  DotsVerticalIcon,
  DotsHorizontalIcon,
  PlusCircleIcon,
} from "@heroicons/vue/solid";
export default defineComponent({
  name: "Node",
  components: {
    XIcon,
    DotsVerticalIcon,
    DotsHorizontalIcon,
    PlusCircleIcon,
  },
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
