import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          "800": "#095150",
          "900": "#073938",
          "50": "#f8fff8",
          "50dark": "#eff5ef",
        },
        neutral: {
          default: "#F5F5F5",
          dark: "#DADADA",
        },
        gray: {
          default: "#494949",
        },
        secondary: "#edfffc",
      },
    },
  },
  plugins: [],
};

export default config;
