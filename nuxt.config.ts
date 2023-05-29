// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;600;900&display=swap'
        }
      ]
    },
  },
  ssr: false,
  css: ["@/assets/styles/main.scss"],
  router: {
    options: {
      linkActiveClass: "active",
      linkExactActiveClass: 'exact-active'
    }
  }
})
