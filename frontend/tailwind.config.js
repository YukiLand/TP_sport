module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rouge: "#E10600",
        bleu: "#AADAE4",
        orange: "#fc8c67",
        blanc: "#ffffff",
        gris: "#f0f0f0",
        vert: "#10652F",
        jaune: "#F9B74D",
        rose: "#ED6E90",
        violet: "#8A4F7D",
        bleuclair: "#AADAE4",
        bleufonce: "#0D2C54",
        noir: "#000000",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#E10600",
          secondary: "#AADAE4",
          accent: "#fc8c67",
          neutral: "#ffffff",
          "base-100": "#f0f0f0",
          success: "#10652F",
          warning: "#F9B74D",
          error: "#ED6E90",
        },
      },
    ],
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
