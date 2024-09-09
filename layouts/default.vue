<script setup lang="ts">
const showSidebar: Ref<boolean> = ref(false);
const toggleSidebar = () => (showSidebar.value = !showSidebar.value);
const links: Link[] = [
  {
    name: "Inicio",
    to: "/",
    icon: "tabler:home",
  },
  {
    name: "Mis contraseñas",
    to: "/my-passwords",
    icon: "tabler:lock-password",
  },
  {
    name: "Iniciar sesión",
    to: "/auth/signin",
    icon: "tabler:user-square",
  },
];
</script>

<template>
  <Header @toggle-sidebar="toggleSidebar" />
  <Transition name="fade">
    <SideBar
      v-show="showSidebar"
      :links="links"
      @toggle-sidebar="toggleSidebar"
    />
  </Transition>

  <slot />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
