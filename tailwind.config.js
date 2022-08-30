module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    fontFamily: {
      // Add your custom fonts and enjoy.
      Inter: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#0078AA",
        "primary-text": "#E7F6F2",
        secondary: "#395B64",
        tertiary: "#A5C9CA",
        accent: "#67CBA0",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
