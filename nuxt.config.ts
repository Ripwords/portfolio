import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    typedPages: true,
  },
  vite: {
    plugins: [tailwindcss()],
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
      rawState: {
        driver: "mongodb",
        connectionString: process.env.MONGO_CONNECTION_STRING,
        databaseName: "ripwords",
        collectionName: "rawState",
      },
    },
  },
  css: ["~/assets/css/main.css"],
  shadcn: {
    prefix: "",
    componentDir: "app/components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
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
    brevoKey: "",
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
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxtjs/seo",
    "@nuxt/eslint",
    "@tresjs/nuxt",
    "nuxt-security",
    "@vueuse/motion/nuxt",
    "shadcn-nuxt",
    "@nuxt/icon",
  ],
})
