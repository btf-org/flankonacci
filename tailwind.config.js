module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      zIndex: ["hover"],
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
