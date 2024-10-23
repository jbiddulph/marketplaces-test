// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      'Fira+Sans': [300, 400, 700],
    },
  },
  ui: {
    primary: 'blue', // Optional: Set your primary theme color
    darkMode: 'class', // Enable dark mode support (adds a class to the HTML tag)
  },
})