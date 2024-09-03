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
        neutral: {
          "400": "#888888",
          "500": "#808080",
          "550": "#F5F5F5",
          "600": "#F2F2F2",
          "700": "#F1F1F1",
        },
        black: {
          "10": "rgba(0, 0, 0, 0.1)",
        },
        candyPink: "#FE7AA1",
        white20: "#F5F5F5"
      }
    },
  },
  plugins: [],
}

