module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      custom: ["Montserrat"],
    },
    extend: {
      minWidth: {
        80: "20rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
