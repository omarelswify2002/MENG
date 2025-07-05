/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ← مكانها هنا برا content
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // theme: {
  //   extend: {},
  // },

  theme: {
    extend: {
      animation: {
        wordChange: 'wordChange 7.5s linear infinite',
        typing: 'typing 2.5s steps(10, end) infinite',
        blink: 'blink 0.8s step-end infinite',
      },
      keyframes: {
        wordChange: {
          '0%, 100%': { content: '"website"' },
          '50%': { content: '"platform"' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': 'currentColor' },
        },
      },
    },
  },
  plugins: [],
}
