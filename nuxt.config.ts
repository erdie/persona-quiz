// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '~/assets/css/global.css'
    ],
    modules: ['@nuxtjs/tailwindcss'],
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true }
})
