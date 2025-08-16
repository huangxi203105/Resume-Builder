/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "screen-sm": "0.25rem", // 4px @ 16px base
        "screen-lg": "0.2778rem", // 5px @ 18px base
      },
      backgroundImage: {
        "text-gradient": "linear-gradient(to right, #7c3aed, #c026d3)",
        "hero-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
      colors: {
        primary: "#7c3aed",
        secondary: "#c026d3",
      },
    },
  },
  plugins: [],
};
