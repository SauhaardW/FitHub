/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'default-gradient': "linear-gradient(180deg, rgba(56, 152, 242, 1), rgba(41, 128, 209, 1));"
      },
      textColor: {
        'default-gradient': "linear-gradient(180deg, rgba(56, 152, 242, 1), rgba(41, 128, 209, 1));"
      }
    },
  },
  plugins: [],
};
