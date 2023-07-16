/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sansSrif: "sans-serif" },
      aspectRatio: {
        "2/1": "2 / 1",
        "7/2": "7 / 2",
        "10/16": "10 / 16",
      },
      boxShadow: {
        top: "0 4px 8px 1px rgba(0, 0, 0, 0.2)",
        album: "0px 0px 0.3rem 0.3rem rgba(0, 0, 0, 0.025)",
      },
    },
    screens: {
      sm: "600px",
      // => @media (min-width: 600px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      xmd: "940px",

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar-hide"),
    // ...
  ],
};
