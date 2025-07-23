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
        primary: "#444444",
        secondary: "#1f1d3a",
        accent: "#498972",
        accent_hover: "#5cad91"
      },
      keyframes: {
        slideRight: {
          'from': { marginLeft: '-100%'},
          'to': {marginLeft: '0%'}
        },
        slideRightTag: {
          'from': { translate: '-60px 0', opacity: "0%"},
          'to': { translate: '0 0', opacity: "100%"}
        },
        slideRightWorkplace: {
          'from': { left: '-60px', opacity: "0%", position: "fixed"},
          'to': { left: '0px', opacity: "100%", position: "fixed"}
        },
        slideLeftTag: {
          'from': { translate: '60px 0', opacity: "0%"},
          'to': { translate: '0 0', opacity: "100%"}
        },
        slideDownTag: {
          'from': { translate: '0 -60px', opacity: "0%"},
          'to': {translate: '0 0', opacity: "100%"}
        },
        slideUpTag: {
          'from': { translate: '0 60px', opacity: "0%"},
          'to': { translate: '0 0', opacity: "100%"}
        }
      },
      animation: {
        'slide-right': 'slideRight 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-right-pulse': '2s cubic-bezier(0.2, 0.8, 0.2, 1) slideRight, 2s linear infinite pulse',
        'slide-right-tag': 'slideRightTag 4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-left-tag': 'slideLeftTag 4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-down-tag': 'slideDownTag 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-up-tag': 'slideUpTag 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-up-tag-5': 'slideUpTag 5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-right-workplace': 'slideRightWorkplace 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }
    },
  },
  plugins: [],
} satisfies Config;
