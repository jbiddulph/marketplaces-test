/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        "caravan-blue": "#61CCF1",
        "secondary": "#C74A03",
        "secondary-hover": "#E9590A"
      },
    },
    fontFamily: {
      'Fira+Sans': "Fira Sans, sans-serif",
    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [],
}

