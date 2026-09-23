/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'breeze-dark': '#07111F',
        'breeze-card': '#0B1628',
        'breeze-blue': '#3B82F6',
        'breeze-cyan': '#22D3EE',
        'breeze-text': '#94A3B8',
        'breeze-white': '#FFFFFF',
      }
    },
  },
  plugins: [],
}
