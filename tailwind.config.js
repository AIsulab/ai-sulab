/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#EE3F2C',
      },
      boxShadow: {
        glass: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 50px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
}
