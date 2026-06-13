/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          light: '#FCD5B5',
          DEFAULT: '#F4A261', // Warm saffron orange
          dark: '#E07A5F', // Burnt saffron
        },
        cream: {
          light: '#FFFDF9',
          DEFAULT: '#FDFBF7', // Rich warm cream
          dark: '#F4EFE6', // Muted cream
        },
        terracotta: {
          DEFAULT: '#C96A53', // Deep clay terracotta
          dark: '#B85A42',
        },
        gold: {
          DEFAULT: '#D4AF37', // Gold accents
          light: '#E5C158',
          dark: '#AA8515',
        },
        darkbrown: {
          light: '#5A4638',
          DEFAULT: '#3D2C20', // Luxury text and dark headings
          dark: '#2B1D15',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -15px rgba(61, 44, 32, 0.15)',
        'premium-hover': '0 20px 40px -20px rgba(61, 44, 32, 0.25)',
      }
    },
  },
  plugins: [],
}
