/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dream: {
          bg: '#05030A', // Deepest dark space background
          card: 'rgba(17, 12, 28, 0.6)', // Glassmorphic card fill
          purple: '#8A2BE2', // Neon Violet/Purple
          blue: '#1E90FF', // Dodger Blue
          teal: '#00FFFF', // Neon Teal/Cyan
          pink: '#FF1493', // Deep Pink
          text: '#F3F4F6', // Light gray
          muted: '#9CA3AF', // Slate gray
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-glow': '0 8px 32px 0 rgba(138, 43, 226, 0.25)',
        'neon-purple': '0 0 15px rgba(138, 43, 226, 0.5)',
        'neon-blue': '0 0 15px rgba(30, 144, 255, 0.5)',
        'neon-teal': '0 0 15px rgba(0, 255, 255, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
        'spin-slow': 'spin 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
