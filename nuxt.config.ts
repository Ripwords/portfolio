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
    optimizeDeps: {
      include: [
        'three',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'vue-sonner',
        '@vee-validate/zod',
        'zod',
        'vee-validate',
        'class-variance-authority',
        'reka-ui',
        'clsx',
        'tailwind-merge',
        '@tresjs/cientos',
        '@tresjs/core',
        '@unhead/schema-org/vue',
      ]
    }
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  shadcn: {
    prefix: "",
    componentDir: "app/components/ui",
  },
  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
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
    public: {
      umamiWebsiteId: "",
    }
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
    devtools: false,
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
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
    "@nuxt/content",
  ],
})
