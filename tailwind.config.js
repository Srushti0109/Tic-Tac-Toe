/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        text: 'var(--text)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        board: 'var(--board)',
        cell: 'var(--cell)',
        'cell-hover': 'var(--cell-hover)',
        success: 'var(--success)',
        'glass-bg': 'var(--glass-bg)',
        'glass-border': 'var(--glass-border)',
      },
      boxShadow: {
        'glow': '0 0 15px var(--primary), 0 0 30px var(--primary)',
        'glow-secondary': '0 0 15px var(--secondary), 0 0 30px var(--secondary)',
        'neon': '0 0 5px theme("colors.primary"), 0 0 20px theme("colors.primary")',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'strike': 'strike 0.5s ease-in-out forwards',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        strike: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '.7', filter: 'brightness(1.5)' },
        },
      }
    },
  },
  plugins: [],
}
