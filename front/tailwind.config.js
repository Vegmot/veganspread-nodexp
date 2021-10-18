module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#00B5AD',
        },
      },
    },
  },
  variants: {
    extend: { scale: ['active', 'hover'] },
  },
  plugins: [],
};
