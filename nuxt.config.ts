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
        "three",
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
      // viewport-fit=cover so env(safe-area-inset-*) resolves on notched iOS devices
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
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
    rateLimiter:
      process.env.NODE_ENV === "development"
        ? false
        : {
            interval: 120000,
            tokensPerInterval: 100,
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
  fonts: {
    families: [
      {
        name: "Playfair Display",
        provider: "google",
        weights: [400, 500, 600, 700, 800],
        styles: ["normal", "italic"],
      },
      { name: "Space Grotesk", provider: "google", weights: [400, 500, 600, 700] },
      { name: "Geist", provider: "google", weights: [300, 400, 500, 600, 700] },
      { name: "Geist Mono", provider: "google", weights: [400, 500] },
    ],
    defaults: {
      fallbacks: {
        "sans-serif": ["ui-sans-serif", "system-ui", "Segoe UI", "Helvetica Neue", "Arial"],
        serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman"],
        monospace: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas"],
      },
    },
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/fonts",
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
