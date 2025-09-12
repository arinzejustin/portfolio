import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'selector',
  important: true,
  content: [
    `components/**/*.{vue,js,ts}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `middleware/**/*.{js,ts,cjs}`,
    `server/**/*.{js,ts,cjs}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', 'ui-sans-serif', 'system-ui'],
        display: ['"Space Grotesk"', 'sans-serif'],
        funky: ['"Pacifico"', 'cursive'], // for cute headings
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      colors: {
        surface: {
          light: "#ffffff",
          dark: "#000000",
        },
        on: {
          light: "#000000",
          dark: "#ffffff",
        }
      },
      animation: {
        'border': 'border 4s linear infinite',
      },
      keyframes: {
        'border': {
          to: { '--border-angle': '360deg' },
        },
      }
    },
  },
  plugins: [],
}

