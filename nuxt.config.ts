// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@nuxtjs/supabase",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/logotipo.png" }],
    },
  },
  css: ["~/assets/css/base.css"],
  imports: {
    dirs: ["types"],
  },
  ssr: false,
});
