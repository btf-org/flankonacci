<template>
  <!-- <div
    :class="
      [{ 'm-4': $store.state.showMargins }, 'relative'].concat(
        Array.from(new Set([...node.itemClasses, ...node.formattingClasses]))
      )
    "
  > -->
  <div
    :class="
      [{ 'm-4': $store.state.showMargins }, 'relative'].concat(topLevelClasses)
    "
  >
    <div
      v-if="node.depth > 0 && $store.state.showMargins"
      class="absolute top-0 right-0"
    >
      <button @click="deleteNode">
        <XIcon class="h-4 w-4" />
      </button>
    </div>
    <div
      v-if="$store.state.showMargins"
      :class="[
        'font-mono',
        'text-xs',
        'absolute',
        'top-0',
        'left-0',
        'hover:z-10',
        'border-transparent',
        'hover:border-green-500',
        'border-2',
        bgColor,
      ]"
    >
      <div>
        Item:
        <button @click="allowEditing('item')" v-if="!itemEditable">
          <PencilIcon class="h-4 w-4" />
        </button>
        <button @click="finishEditing('item')" v-if="itemEditable">
          <CheckCircleIcon class="h-4 w-4" />
        </button>
        <input
          v-model="itemClasses"
          :disabled="!itemEditable"
          :class="[!itemEditable ? bgColor : '']"
        />
      </div>
      <div v-if="node?.children.length > 0">
        Container:
        <button @click="allowEditing('container')" v-if="!containerEditable">
          <PencilIcon class="h-4 w-4" />
        </button>
        <button @click="finishEditing('container')" v-if="containerEditable">
          <CheckCircleIcon class="h-4 w-4" />
        </button>
        <input v-model="containerClasses" :disabled="!containerEditable" />
      </div>
    </div>
    <div
      class="flex flex-row justify-center items-center h-full"
      v-if="
        node.comp == null &&
        node.children.length == 0 &&
        // @ts-ignore
        $store.state.showMargins
      "
    >
      <button @click="addRow"><DotsHorizontalIcon class="h-5 w-5" /></button>
      <button @click="addColumn"><DotsVerticalIcon class="h-5 w-5" /></button>
      <Dropdown @addComponent="addComponent"></Dropdown>
    </div>
    <component v-if="node.comp !== null" :is="node.comp"></component>
    <div
      v-if="node.comp == null && node.children.length > 0"
      :class="Array.from(node.containerClasses)"
    >
      <Node v-for="child in node.children" :key="child.id" :node="child"></Node>
      <div v-if="$store.state.showMargins">
        <button @click="addChild"><PlusCircleIcon class="h-5 w-5" /></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { node } from "./types";
import {
  XIcon,
  DotsVerticalIcon,
  DotsHorizontalIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  PencilIcon,
} from "@heroicons/vue/solid";
import Dropdown from "./Dropdown.vue";
import ExampleTable from "./ExampleTable.vue";
import ExampleStats from "./ExampleStats.vue";
import ExampleText from "./ExampleText.vue";

export default defineComponent({
  name: "Node",
  components: {
    XIcon,
    DotsVerticalIcon,
    DotsHorizontalIcon,
    PlusCircleIcon,
    CheckCircleIcon,
    PencilIcon,
    Dropdown,
    ExampleTable,
    ExampleStats,
    ExampleText,
  },
  props: {
    node: {
      type: Object as PropType<node>,
      required: true,
    },
  },
  data: () => {
    return {
      itemEditable: false,
      itemClasses: "",
      containerClasses: "",
      containerEditable: false,
      bgColor: "",
    };
  },
  computed: {
    topLevelClasses() {
      // @ts-ignore
      if (this.$store.state.showMargins) {
        return Array.from(
          new Set([...this.node.itemClasses, ...this.node.formattingClasses])
        );
      } else {
        return Array.from(this.node.itemClasses);
      }
    },
  },
  watch: {
    "node.itemClasses": {
      handler: function (newVal) {
        this.itemClasses = Array.from(newVal).join(" ");
      },
      deep: true,
    },
    "node.containerClasses": {
      handler: function (newVal) {
        this.containerClasses = Array.from(newVal).join(" ");
      },
      deep: true,
    },
  },
  created() {
    this.itemClasses = Array.from(this.node.itemClasses).join(" ");
    this.containerClasses = Array.from(this.node.containerClasses).join(" ");
    this.bgColor =
      Array.from(this.node.formattingClasses).find((e) => /bg-/.test(e)) || "";
  },
  methods: {
    addColumn() {
      // @ts-ignore
      this.$store.commit("addColumn", {
        id: this.node.id,
      });
    },
    addRow() {
      // @ts-ignore
      this.$store.commit("addRow", {
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
    allowEditing(list: string) {
      if (list == "item") {
        this.itemEditable = true;
      } else if (list == "container") {
        this.containerEditable = true;
      }
    },
    finishEditing(list: string) {
      if (list == "item") {
        this.itemEditable = false;
      } else if (list == "container") {
        this.containerEditable = false;
      }
      // @ts-ignore
      this.$store.commit("updateClasses", {
        id: this.node.id,
        classes: list == "item" ? this.itemClasses : this.containerClasses,
        list,
      });
    },
    addComponent(comp: string) {
      // @ts-ignore
      this.$store.commit("updateComponent", {
        id: this.node.id,
        comp: comp,
      });
    },
  },
});
</script>

<style scoped>
</style>
