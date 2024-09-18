<script setup lang="ts">
import { toast } from "@/components/ui/toast";
import { AuthService } from "~/services/AuthService";

const authService = new AuthService();
const user = useSupabaseUser();
const showSidebar: Ref<boolean> = ref(false);
const toggleSidebar = () => (showSidebar.value = !showSidebar.value);
const logout = async () => {
  try {
    const { error } = await authService.logout();

    if (error) {
      toast({
        title: "Error al cerrar sesión",
      });
      return;
    }

    toast({
      title: "Has cerrado sesión correctamente",
    });
  } catch {
    toast({
      title: "Error al cerrar sesión",
    });
  }
};
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
      @logout="logout"
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
