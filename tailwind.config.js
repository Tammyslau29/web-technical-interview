/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      textColor: {
        'white': '#ffffff',
      },
    },
    colors: {
      'primary': '#1b1f4f', // Replace with your custom color code
    },
  },
  variants: {
    extend: {
      disabled: ['opacity', 'cursor', 'pointer-events'],
    },
  },
  plugins: [],
}
