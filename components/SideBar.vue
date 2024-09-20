<script setup lang="ts">
defineProps({
  links: {
    type: Array as () => Link[],
    required: true,
  },
  user: {
    type: Object as () => any,
  },
});
const emits = defineEmits(["toggle-sidebar", "logout"]);

const toggleSidebar = () => {
  emits("toggle-sidebar");
};
</script>

<template>
  <nav
    class="fixed top-0 w-full md:w-auto h-dvh flex flex-col py-16 px-8 border-r z-20 bg-white"
  >
    <Icon
      name="tabler:x"
      class="absolute top-2 right-2 text-black/75 text-2xl cursor-pointer"
      @click="toggleSidebar"
    />
    <div class="space-y-2">
      <NuxtLink
        v-for="link in links"
        :to="link.to"
        class="flex items-center w-full py-2 px-12 group hover:bg-blue-400 hover:text-white rounded duration-200 ease-in"
        active-class="active"
        @click="toggleSidebar"
      >
        <Icon
          :name="link.icon"
          class="icon mr-2 text-black/75 group-hover:text-white duration-200 ease-in text-lg"
        />
        {{ link.name }}
      </NuxtLink>
    </div>
    <div class="flex flex-grow items-end" v-if="user">
      <Button variant="destructive" class="w-full" @click="$emit('logout')">
        Cerrar sesión
      </Button>
    </div>
  </nav>
</template>

<style scoped>
.active {
  background-color: rgb(59 130 246 / var(--tw-bg-opacity));
  color: white;
  & .icon {
    color: white;
  }
}
</style>
