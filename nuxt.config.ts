// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import dotenv from 'dotenv';

dotenv.config();

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
    inject: true, // lets you use <NuxtImg> globally
    quality: 100, // max quality
    densities: [1, 2, 3], // retina/HDPI scaling
    format: ["webp", "jpeg", "png"], // generate multiple formats
    screens: {
      sm: 320,
      md: 640,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  tailwindcss: {
    cssPath: [
      '~/assets/css/tailwind.css',
      {
        injectPosition: 1
      },
    ],
  },
  runtimeConfig: {
    googlePassKey: '',
    googlePassUser: '',
    myEmail: '',
  }
})
