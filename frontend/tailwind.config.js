/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C62828', // Merah Kopdes Formal
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FCA5A5',
          300: '#F87171',
          400: '#EF4444',
          500: '#DC2626',
          600: '#C62828',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          muted: '#F1F5F9',
          white: '#FFFFFF',
        },
        darkText: '#0F172A',
        subText: '#475569',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 12px -2px rgba(198, 40, 40, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
