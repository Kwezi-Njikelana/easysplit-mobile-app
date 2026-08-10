/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
         primaryColor: "#012355",
        secondaryColor: "#9CA3AF",
        lightGrayColor: "#8b8e94",
        lightRedColor: "#FF6666",
        borderColor: "#D3D7E5",
        whiteColor: "#FAFAFA",
        orangeColor: "#FF8B02",
        orangeColorHover: "#C66B00",
        greenColor: "#02C24F",
        greyColor:'#5A6D8E',
        raspberryRedColor: "#F0055A",
        backgroundFormColor: "#EDF0F4",
        backgroundMainColor: "#F2F3F8",
        blueColor: "#0078FF",
        tertiaryColor: "#E4F5FE",
        darkerTertiaryColor: "#A7C1CF",
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
      },
    },
  },
  plugins: [],
};
