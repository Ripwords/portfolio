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
  nitro: {
    storage: {
      state: {
        driver: "mongodb",
        connectionString: process.env.MONGO_CONNECTION_STRING,
        databaseName: "ripwords",
        collectionName: "state",
      },
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "JJ Teoh",
      charset: "utf-8",
      meta: [
        {
          name: "google-site-verification",
          content: "7AlIEVHApOdcvrTQYsuIfcGOyszAV1XQXEoWGaEAJgc",
        },
      ],
    },
  },
  runtimeConfig: {
    googleFormId: "",
    googleFormEmailId: "",
    googleFormSubjectId: "",
    googleFormTextId: "",
    googleFormNameId: "",
  },
  security: {
    rateLimiter: {
      interval: 120000,
      tokensPerInterval: 25,
    },
  },
  site: {
    url: "https://jjteoh.com",
    name: "JJ Teoh",
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
