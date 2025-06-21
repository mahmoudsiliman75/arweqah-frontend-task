// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
    },
    pageTransition: { name: "fadeIn", mode: "out-in" },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },

  modules: [
    'vuetify-nuxt-module',
    '@nuxtjs/tailwindcss'
  ],

  css: [
    '@/assets/css/tailwind.css',
  ],

  tailwindcss: {
    config: {
      corePlugins: {
        preflight: false,
      }
    }
  },

  build: {
    transpile: ['vuetify'],
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-05-15',
})