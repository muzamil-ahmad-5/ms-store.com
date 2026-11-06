/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          deep: '#050505',
          secondary: '#111111',
          dark: '#1A1A1A',
          charcoal: '#222222',
          silver: '#C6C6C6',
          light: '#E5E5E5',
          white: '#FFFFFF',
          ivory: '#F5F3EF',
          green: '#16A34A',
          red: '#DC2626',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.25em',
        editorial: '0.15em',
      },
      boxShadow: {
        'subtle': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'elevated': '0 10px 40px rgba(0, 0, 0, 0.7)',
        'silver-glow': '0 0 25px rgba(198, 198, 198, 0.15)',
      },
    },
  },
  plugins: [],
};
