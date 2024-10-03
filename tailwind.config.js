/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: { 
        'notificationGradient': 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 73%, rgba(255, 255, 255, 0) 100%)',
      },
      colors: {
        brand: "#002E86",
        brandLight: {
          "100": "#63C7EC",
          "200": "#009ADF",
          "300": "#61CCF2",
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
        red: {
          "15": "rgba(235, 92, 84, 0.15)"
        },
        offWhite: "#EEEEEE",
        candyPink: "#FE7AA1",
        white20: "#F5F5F5",
        white60: "#F6F6F6",
        paleMint: "#D5E7E8",
        gray65: "#A5A5A5",
      }
    },
  },
  plugins: [],
}

