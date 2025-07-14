import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        slideRight: {
          'from': { marginLeft: '-100%'},
          'to': {marginLeft: '0%'}
        }
      },
      animation: {
        'slide-right': 'slideRight 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-right-pulse': '2s cubic-bezier(0.2, 0.8, 0.2, 1) slideRight, 2s linear infinite pulse'
      }
    },
  },
  plugins: [],
} satisfies Config;
