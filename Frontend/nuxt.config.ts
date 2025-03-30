// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({

  plugins: ['~/plugins/fetch.ts'],

  devServer: {
    port: 3001,
  },


  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000/api', // ✅ buraya backend adresini yaz
    },
  },
})