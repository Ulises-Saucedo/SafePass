<script setup lang="ts">
useHead({
  title: "Inicio",
});
</script>

<template>
  <section
    class="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-600 text-white"
  >
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center space-y-4 text-center">
        <div class="space-y-2">
          <h1
            class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
          >
            Guarda tus contraseñas con SafePass
          </h1>
          <p class="mx-auto max-w-[700px] text-blue-100 md:text-xl">
            Gestiona tus contraseñas de forma segura y accede a ellas desde
            cualquier dispositivo. Simplifica tu vida digital con SafePass.
          </p>
        </div>
        <div class="space-x-4">
          <Button class="bg-white text-blue-600 hover:bg-blue-100" as-child>
            <NuxtLink to="/auth/signin">Prueba gratis</NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </section>

  <section class="w-full py-12 md:py-24 lg:py-32 bg-white">
    <div class="container px-4 md:px-6">
      <h2
        class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-blue-800"
      >
        Características principales
      </h2>
      <div class="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        <div class="flex flex-col items-center text-center">
          <Icon
            name="tabler:lock-password"
            class="h-12 w-12 mb-4 text-blue-600"
          />
          <h3 class="text-xl font-bold mb-2 text-blue-800">
            Encriptación avanzada
          </h3>
          <p class="text-blue-600">
            Tus contraseñas están protegidas con encriptación de grado militar.
          </p>
        </div>
        <div class="flex flex-col items-center text-center">
          <Icon
            name="tabler:rectangle-vertical"
            class="h-12 w-12 mb-4 text-blue-600"
          />
          <h3 class="text-xl font-bold mb-2 text-blue-800">Acceso rápido</h3>
          <p class="text-blue-600">
            Accede a tus contraseñas desde cualquier dispositivo, en cualquier
            momento.
          </p>
        </div>
        <div class="flex flex-col items-center text-center">
          <Icon name="tabler:refresh" class="h-12 w-12 mb-4 text-blue-600" />
          <h3 class="text-xl font-bold mb-2 text-blue-800">
            Generador de contraseñas
          </h3>
          <p class="text-blue-600">
            Crea contraseñas fuertes y únicas con un solo clic.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="w-full py-12 md:py-24 lg:py-32 bg-blue-100">
    <div class="container px-4 md:px-6">
      <h2
        class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-blue-800"
      >
        Cómo funciona SafePass
      </h2>
      <div class="grid gap-8 md:grid-cols-3">
        <div class="flex flex-col items-center text-center">
          <div
            class="rounded-full bg-blue-600 text-white w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold"
          >
            1
          </div>
          <h3 class="text-xl font-bold mb-2 text-blue-800">Regístrate</h3>
          <p class="text-blue-700">
            Crea tu cuenta SafePass con una contraseña maestra segura.
          </p>
        </div>
        <div class="flex flex-col items-center text-center">
          <div
            class="rounded-full bg-blue-600 text-white w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold"
          >
            2
          </div>
          <h3 class="text-xl font-bold mb-2 text-blue-800">
            Guarda tus contraseñas
          </h3>
          <p class="text-blue-700">
            Añade tus contraseñas existentes o genera nuevas con nuestro
            generador.
          </p>
        </div>
        <div class="flex flex-col items-center text-center">
          <div
            class="rounded-full bg-blue-600 text-white w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold"
          >
            3
          </div>
          <h3 class="text-xl font-bold mb-2 text-blue-800">
            Accede fácilmente
          </h3>
          <p class="text-blue-700">
            Inicia sesión en tus cuentas con un solo clic desde cualquier
            dispositivo.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="w-full py-12 md:py-24 lg:py-32">
    <div class="container px-4 md:px-6">
      <h2
        class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-blue-800"
      >
        Lo que dicen nuestros usuarios
      </h2>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card class="border-blue-200">
          <CardHeader>
            <CardTitle class="text-blue-800">María G.</CardTitle>
            <CardDescription class="text-blue-600">
              Diseñadora freelance
            </CardDescription>
          </CardHeader>
          <CardContent>
            "SafePass ha simplificado mi vida digital. Ya no tengo que recordar
            docenas de contraseñas complejas."
          </CardContent>
        </Card>
        <Card class="border-blue-200">
          <CardHeader>
            <CardTitle class="text-blue-800">Carlos R.</CardTitle>
            <CardDescription class="text-blue-600">
              Gerente de IT
            </CardDescription>
          </CardHeader>
          <CardContent>
            "La seguridad de nuestra empresa ha mejorado significativamente
            desde que implementamos SafePass para todo el equipo."
          </CardContent>
        </Card>
        <Card class="border-blue-200">
          <CardHeader>
            <CardTitle class="text-blue-800">Laura M.</CardTitle>
            <CardDescription class="text-blue-600">
              Estudiante universitaria
            </CardDescription>
          </CardHeader>
          <CardContent>
            "Como estudiante, el plan gratuito de SafePass es perfecto para mí.
            Mis cuentas nunca han estado tan seguras."
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <section class="w-full py-12 md:py-24 lg:py-32 bg-blue-800 text-white">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center space-y-4 text-center">
        <div class="space-y-2">
          <h2
            class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            Protege tus contraseñas hoy mismo
          </h2>
          <p class="mx-auto max-w-[700px] text-blue-200 md:text-xl">
            Únete a miles de usuarios que confían en SafePass para mantener sus
            cuentas seguras.
          </p>
        </div>
        <div class="space-x-4">
          <Button class="bg-white text-blue-800 hover:bg-blue-100" as-child>
            <NuxtLink to="/auth/signin">Prueba gratis</NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
