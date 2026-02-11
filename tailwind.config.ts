import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
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
        serif: ['"Playfair Display"', 'serif'], // Elegant alternative
        funky: ['"Pacifico"', 'cursive'], 
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'neon': '0 0 10px rgba(212, 175, 55, 0.5), 0 0 20px rgba(212, 175, 55, 0.3)',
      },
      colors: {
        surface: {
          light: "#FAFAFA",
          dark: "#050505", // Richer black
          dim: "#0A0A0A",
        },
        on: {
          light: "#1A1A1A",
          dark: "#E5E5E5",
          muted: "#A3A3A3",
        },
        accent: {
          gold: "#D4AF37",
          silver: "#C0C0C0",
          bronze: "#CD7F32",
        }
      },
      animation: {
        'border': 'border 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'border': {
          to: { '--border-angle': '360deg' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}


