// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    typedPages: true,
  },
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "title",
      charset: "utf-8",
    },
  },
  runtimeConfig: {
    googleFormId: "",
    googleFormEmailId: "",
    googleFormSubjectId: "",
    googleFormTextId: "",
    googleFormNameId: "",
  },
  site: {
    url: "https://ripwords.link",
    name: "Ripwords",
  },
  tres: {
    devtools: true,
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/seo",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@tresjs/nuxt",
    "nuxt-security",
  ],
})