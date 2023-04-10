/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0096EB",
        secondary: "#0081a4",
        blue1: "#0f30eb",
        blue2: "#00eb3b",
        blue3: "#00a429",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
