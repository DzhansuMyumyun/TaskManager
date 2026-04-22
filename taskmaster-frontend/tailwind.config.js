/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
        // This replaces the default 'font-sans' with Inter
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
  },
  plugins: [],
};