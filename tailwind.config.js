/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#002E86",
        brandLight: {
          "100": "#63C7EC",
          "200": "#009ADF",
        },
        candyPink: "#FE7AA1",
        white20: "#F5F5F5"
      }
    },
  },
  plugins: [],
}

