module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#757ce8",
          DEFAULT: "#3f50b5",
          dark: "#002884",
          contrastText: "#ffffff",
        },
        secondary: {
          light: "#ff7961",
          DEFAULT: "#f44336",
          dark: "#ba000d",
          contrastText: "#000000",
        },
      },
    },
    fontFamily: {
      add: [
        '"Wawati SC"',
        '"Hiragino Kaku Gothic ProN"',
        '"ヒラギノ角ゴ ProN W3"',
        "メイリオ",
        "Meiryo",
        "sans-serif",
      ],
      myo: [
        "Yu Mincho Light",
        "YuMincho",
        "Yu Mincho",
        "游明朝体",
        "ヒラギノ明朝 ProN",
        "Hiragino Mincho ProN",
        "sans-serif",
      ],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
