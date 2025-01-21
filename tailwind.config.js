/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': "#31525B",
        'bg-muted': "#F1F1E6",
        'bg-highlight': "#D37B31",
        'bg-accent': "#B2D5E0",
      },
      fontFamily: {
        logo: ["Italiana", "serif"],
        body: ["Inter", "sans-serif"],
        heading: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
}