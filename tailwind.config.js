/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@chimera-ui/components/dist/**/*.{js,mjs}",
  ],
  plugins: [
    require("@chimera-ui/tw-plugin"),
  ],
};