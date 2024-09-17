<script setup lang="ts">
const user = useSupabaseUser();
const showSidebar: Ref<boolean> = ref(false);
const toggleSidebar = () => (showSidebar.value = !showSidebar.value);
const links: ComputedRef<Link[]> = computed(() => [
  {
    name: "Inicio",
    to: "/",
    icon: "tabler:home",
  },
  ...(user.value
    ? [
        {
          name: "Mis contraseñas",
          to: "/my-passwords",
          icon: "tabler:lock-password",
        },
      ]
    : [
        {
          name: "Iniciar sesión",
          to: "/auth/signin",
          icon: "tabler:user-square",
        },
        {
          name: "Crear cuenta",
          to: "/auth/signup",
          icon: "tabler:user-plus",
        },
      ]),
]);
</script>

<template>
  <Header @toggle-sidebar="toggleSidebar" />
  <Transition name="fade">
    <SideBar
      v-show="showSidebar"
      :links="links"
      :user="user"
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
