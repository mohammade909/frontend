/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'inset 2px 2px 5px rgba(70, 70, 70, 0.3), inset -5px -5px 10px rgba(255, 255, 255, 0.8)',
        'custom-focus': 'inset 1px 1px 2px rgba(70, 70, 70, 0.3), inset -1px -1px 2px rgba(255, 255, 255, 0.8)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.shadow-custom': {
            boxShadow: 'inset 2px 2px 5px rgba(70, 70, 70, 0.3), inset -5px -5px 10px rgba(255, 255, 255, 0.8)',
            width: '100%',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease-in-out',
            appearance: 'none',
            WebkitAppearance: 'none',
          },
          '.shadow-custom-focus:focus': {
            boxShadow: 'inset 1px 1px 2px rgba(70, 70, 70, 0.3), inset -1px -1px 2px rgba(255, 255, 255, 0.8)',
          },
        },
        ['responsive', 'hover', 'focus']
      );
    },
  ],
}
