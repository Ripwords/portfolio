import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 5,
  },
  experimental: {
    typedPages: true,
    nitroAutoImports: true,
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "three",
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "vue-sonner",
        "@vee-validate/zod",
        "zod",
        "vee-validate",
        "class-variance-authority",
        "reka-ui",
        "clsx",
        "tailwind-merge",
        "@tresjs/cientos",
        "@tresjs/core",
        "@unhead/schema-org/vue",
      ],
    },
    build: {
      sourcemap: false,
    },
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
    },
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        "script-src": ["'self'", "'unsafe-inline'", "'wasm-unsafe-eval'", "https:"],
        "img-src": ["'self'", "data:", "https://raw.githubusercontent.com"],
      },
    },
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
      scrollBehaviorType: "smooth",
    },
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxtjs/seo",
    "@tresjs/nuxt",
    "nuxt-security",
    "@vueuse/motion/nuxt",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@nuxt/content",
  ],
});
