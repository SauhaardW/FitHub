/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'default-gradient': "linear-gradient(180deg, rgba(56, 152, 242, 1), rgba(41, 128, 209, 1));",
        'disabled-gradient': "linear-gradient(180deg, rgba(169, 169, 169, 1), rgba(162, 162, 162, 1));",
        'disabled-gradient-lighter': "linear-gradient(180deg, rgba(220, 220, 220, 1), rgba(213, 213, 213, 1));",
      }
    },
  },
  plugins: [],
}
