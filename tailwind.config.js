/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        success: { DEFAULT: 'var(--color-success)', light: 'var(--color-success-light)' },
        warning: { DEFAULT: 'var(--color-warning)', light: 'var(--color-warning-light)' },
        danger: { DEFAULT: 'var(--color-danger)', light: 'var(--color-danger-light)' },
        info: { DEFAULT: 'var(--color-info)', light: 'var(--color-info-light)' },
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          700: 'var(--color-neutral-700)',
          900: 'var(--color-neutral-900)',
        },
      },
      fontFamily: { sans: ['Montserrat', 'sans-serif'] },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      spacing: {
        tight: 'var(--space-tight)',
        gap: 'var(--space-gap)',
        inner: 'var(--space-inner)',
        section: 'var(--space-section)',
        page: 'var(--space-page)',
      },
    },
  },
  plugins: [],
}
