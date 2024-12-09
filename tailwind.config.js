/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 4s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateX(-42px)' },
          '100%': { transform: 'translateX(84px)' },
        }
      }
    },
  },
  plugins: [],
}

