<script setup lang="ts">
const emits = defineEmits(["toggle-sidebar"]);

const toggleSidebar = () => {
  emits("toggle-sidebar");
};
</script>

<template>
  <header class="sticky top-0 w-full border-b bg-white">
    <nav class="flex items-center px-6 py-4">
      <Icon
        name="tabler:menu-2"
        class="cursor-pointer text-black/75 text-2xl"
        @click="toggleSidebar"
      />
    </nav>
  </header>
</template>
