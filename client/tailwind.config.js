/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Tüm bileşenlerde Tailwind'in çalışmasını sağlar
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        "card":"repeat(auto-fill,minmax(150px,1fr))",
      }
    },
  },
  plugins: [],
}

