/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'text-gradient': 'linear-gradient(to right, #7c3aed, #c026d3)',
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      colors: {
        primary: '#7c3aed',
        secondary: '#c026d3',
      }
    }
  },
  plugins: [],
}
