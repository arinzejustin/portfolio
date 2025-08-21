// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  css: [
    '~/assets/css/global.css',
    '~/assets/css/animate.css',
  ],
  ssr: true,
  app: {
    head: {
      script: [
        {
          innerHTML: `
            (function() {
              const userPref = localStorage.getItem('theme');
              const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              const theme = userPref || systemPref;
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })()
          `,
          type: "text/javascript"
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@400;600&family=Space+Grotesk:wght@400;700&display=swap',
          crossorigin: 'anonymous',
        }
      ]
    },
    pageTransition: {
      name: 'blur',
      mode: 'out-in'
    },
  },
  build: {
    transpile: ['gsap'],
  },
  image: {
    inject: true,
    quality: 100,
    densities: [1, 2, 3]
  },
  tailwindcss: {
    cssPath: [
      '~/assets/css/tailwind.css',
      {
        injectPosition: 1
      },
    ],
  },
})
