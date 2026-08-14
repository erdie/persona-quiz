import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '~/assets/css/global.css'
    ],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true }
})
