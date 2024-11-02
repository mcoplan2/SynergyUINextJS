import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this path if needed
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00796B',
        secondary: '#A5D6A7',
        accent: '#4FC3F7',
        neutral: '#E0E0E0',
        highlight: '#01579B',
      },
    },
  },
  plugins: [],
};
export default config;
