<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="
          bg-gray-100
          rounded-full
          flex
          items-center
          text-gray-400
          hover:text-gray-600
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-offset-gray-100
          focus:ring-indigo-500
        "
      >
        <span class="sr-only">Open options</span>
        <CubeIcon class="h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="
          origin-top-right
          absolute
          right-0
          mt-2
          w-56
          rounded-md
          shadow-lg
          bg-white
          ring-1 ring-black ring-opacity-5
          focus:outline-none
        "
      >
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a
              @click="$emit('addComponent', 'ExampleTable')"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
              >Table</a
            >
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a
              @click="$emit('addComponent', 'ExampleStats')"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
              >Stats</a
            >
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a
              @click="$emit('addComponent', 'ExampleText')"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
              >Text</a
            >
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a
              @click="$emit('addComponent', 'ExampleNavBar')"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
              >NavBar</a
            >
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a
              @click="$emit('addComponent', 'ExampleTabs')"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
              >Tabs</a
            >
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { CubeIcon } from "@heroicons/vue/solid";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    CubeIcon,
  },
};
</script>