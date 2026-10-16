/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',      // Bleu foncé SmartRDV
        secondary: '#3b82f6',    // Bleu moyen
        success: '#16a34a',      // Vert (FAIBLE)
        warning: '#ca8a04',      // Jaune (MODÉRÉ)
        danger: '#ea580c',       // Orange (URGENT)
        critical: '#dc2626',     // Rouge (CRITIQUE)
      },
    },
  },
  plugins: [],
};