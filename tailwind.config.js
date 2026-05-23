/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B2545', // Deep Navy
          dark: '#07162C',
          light: '#134074',
        },
        accent: {
          DEFAULT: '#D4AF37', // Gold
          hover: '#E5C453',
          dark: '#B3922E',
          soft: '#FBF8EE',
        },
        navy: {
          50: '#F4F7FA',
          100: '#E8ECF2',
          200: '#D1DBE6',
          300: '#B0C2D6',
          400: '#87A4C4',
          500: '#6487AF',
          600: '#4C6E96',
          700: '#3D577A',
          800: '#0B2545', // Primary
          900: '#07162C', // Deep dark Navy
        },
        neutral: {
          50: '#FAFBFD',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          450: '#6B7280',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(11, 37, 69, 0.08)',
        'premium-hover': '0 20px 40px -12px rgba(11, 37, 69, 0.16)',
        'accent': '0 8px 24px -6px rgba(212, 175, 55, 0.3)',
        'accent-hover': '0 12px 28px -4px rgba(229, 196, 83, 0.45)',
        'glass': '0 8px 32px 0 rgba(11, 37, 69, 0.08)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
