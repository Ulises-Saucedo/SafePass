<script setup lang="ts">
import * as z from "zod";
import { toast } from "@/components/ui/toast";
import { AuthService } from "~/services/AuthService";

useHead({
  title: "Iniciar sesión",
});

const authService = new AuthService();
const router = useRouter();
const schema = z.object({
  email: z
    .string({
      required_error: "El email es requerido.",
    })
    .email("Formato incorrecto"),
  password: z
    .string({
      required_error: "La contraseña es requerida.",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
});

async function googleSignIn() {
  try {
    const { error } = await authService.signInWithGoogle();

    if (error) {
      toast({
        title: "Error al iniciar sesión con Google",
      });
      return;
    }
  } catch {
    toast({
      title: "Error al iniciar sesión con Google",
    });
  }
}

async function onSubmit(values: Record<string, any>) {
  try {
    const { error } = await authService.signInWithEmailAndPassword(
      values.email,
      values.password
    );

    if (error) {
      toast({
        title: "Error al iniciar sesión",
      });
      return;
    }

    toast({
      title: "Has iniciado sesión correctamente",
    });

    router.push("/");
  } catch {
    toast({
      title: "Error al iniciar sesión",
    });
  }
}
</script>

<template>
  <div class="px-4">
    <Card class="mx-auto max-w-[500px] my-16">
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>Inicie sesión con sus credenciales</CardDescription>
      </CardHeader>
      <CardContent>
        <AutoForm
          class="w-full space-y-6"
          :schema="schema"
          :field-config="{
            password: {
              label: 'Contraseña',
              inputProps: {
                type: 'password',
                placeholder: '••••••••',
              },
            },
          }"
          @submit="onSubmit"
        >
          <Button type="submit" class="w-full"> Iniciar sesión </Button>
        </AutoForm>
        <Button
          type="button"
          variant="outline"
          class="w-full my-2"
          @click="googleSignIn"
        >
          <Icon
            name="tabler:brand-google-filled"
            class="text-black/75 w-4 h-4 mr-2"
          />
          Google
        </Button>
        <NuxtLink to="/auth/signup">
          ¿No tienes cuenta?
          <span class="text-blue-500 underline">Registrarme</span>
        </NuxtLink>
      </CardContent>
    </Card>
  </div>
</template>
