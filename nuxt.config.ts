// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    css: ['vuetify/lib/styles/main.sass'],
    build: {
      transpile: ['vuetify'],
    },
    vite: {
      define: {
        'process.env.DEBUG': false,
      },
    },
    ssr: false,
    // plugins: [
    //   { src: "~/plugins/leaflet.js", ssr: false }
    // ],
    modules: [
      '@pinia/nuxt',
      '@nuxtjs/i18n',
      // 'nuxt-leaflet'
    ],
    i18n: {
      langDir: 'locales',
      defaultLocale: 'tc',
      locales: [
        {
          code: 'tc',
          file: 'tc.json'
        },
        {
          code: 'en',
          file: 'en.json'
        }
      ],
      vueI18n: {
        legacy: false,
      }
    }
})
