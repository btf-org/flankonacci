<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <DialogOverlay class="absolute inset-0" />

        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <div class="w-screen max-w-md">
              <div
                class="
                  h-full
                  flex flex-col
                  py-6
                  bg-white
                  shadow-xl
                  overflow-y-scroll
                "
              >
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <DialogTitle class="text-lg font-medium text-gray-900">
                      Panel title
                    </DialogTitle>
                    <div class="ml-3 h-7 flex items-center">
                      <button
                        type="button"
                        class="
                          bg-white
                          rounded-md
                          text-gray-400
                          hover:text-gray-500
                          focus:outline-none
                          focus:ring-2
                          focus:ring-offset-2
                          focus:ring-indigo-500
                        "
                        @click="$emit('close')"
                      >
                        <span class="sr-only">Close panel</span>
                        <XIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                  <SwitchGroup as="div" class="flex items-center">
                    <Switch
                      v-model="staticDataEditing"
                      :class="[
                        staticDataEditing ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                      ]"
                    >
                      <span
                        aria-hidden="true"
                        :class="[
                          staticDataEditing ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                        ]"
                      />
                    </Switch>
                    <SwitchLabel as="span" class="ml-3">
                      <span class="text-sm font-medium text-gray-900"
                        >Edit Data Statically</span
                      >
                    </SwitchLabel>
                  </SwitchGroup>
                  <div>
                    <label
                      for="comment"
                      class="block text-sm font-medium text-gray-700"
                      >Add your comment</label
                    >
                    <div class="mt-1">
                      <textarea
                        rows="4"
                        name="comment"
                        id="comment"
                        v-model="overlayText"
                        :disabled="!staticDataEditing"
                        :class="[
                          'shadow-sm',
                          'focus:ring-indigo-500 focus:border-indigo-500',
                          'block',
                          'w-full',
                          'sm:text-sm',
                          'border-gray-300',
                          'rounded-md',
                          { 'text-gray-500': !staticDataEditing },
                        ]"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="comment"
                      class="block text-sm font-medium text-gray-700"
                      >Add your comment</label
                    >
                    <div class="mt-1">
                      <textarea
                        rows="4"
                        name="comment"
                        id="comment"
                        v-model="overlayf"
                        :disabled="staticDataEditing"
                        :class="[
                          'shadow-sm',
                          'focus:ring-indigo-500 focus:border-indigo-500',
                          'block',
                          'w-full',
                          'sm:text-sm',
                          'border-gray-300',
                          'rounded-md',
                          { 'text-gray-500': staticDataEditing },
                        ]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  Switch,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
    Switch,
    SwitchGroup,
    SwitchLabel,
  },
  props: ["show"],
  data() {
    return { overlayText: "", overlayf: "" };
  },
  created() {
    // @ts-ignore
    this.overlayText = JSON.stringify(this.$store.state.overlayData);
    // @ts-ignore
    this.overlayf = this.$store.state.overlayf.toString();
  },
  computed: {
    vuexOverlayData(): any {
      // @ts-ignore
      return this.$store.state.overlayData;
    },
    vuexOverlayf(): any {
      // @ts-ignore
      return this.$store.state.overlayf;
    },
    staticDataEditing: {
      get(): boolean {
        // @ts-ignore
        return this.$store.state.staticDataEditing;
      },
      set(value: boolean) {
        // @ts-ignore
        this.$store.commit("updateEditingMode", {
          var: "staticDataEditing",
          newVal: value,
        });
        // this.$store.commit("updateInDesignMode", value);
      },
    },
  },
  watch: {
    overlayText: function (newVal: any) {
      // @ts-ignore
      this.$store.commit("updateComponentData", {
        // @ts-ignore
        id: this.$store.state.overlayId,
        // @ts-ignore
        compData: JSON.parse(newVal),
      });
    },
    vuexOverlayData(newVal: any) {
      // @ts-ignore
      this.overlayText = JSON.stringify(newVal) || "";
    },
    overlayf: function (newVal: any) {
      console.log("newVal");
      try {
        const payload = {
          // @ts-ignore
          id: this.$store.state.overlayId,
          // @ts-ignore
          compf: new Function("return " + newVal)(),
        };
        // @ts-ignore
        this.$store.commit("updateComponentf", payload);
      } catch (e) {
        console.log(e);
      }
    },
    vuexOverlayf(newVal: any) {
      // @ts-ignore
      this.overlayf = newVal.toString();
    },
  },
  //   setup() {
  //     const open = ref(true);

  //     return {
  //       open,
  //     };
  //   },
};
</script>