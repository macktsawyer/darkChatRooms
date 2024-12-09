/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'DEFAULT', 'text-white', 'text-slate', 'text-lightslate', 'text-stone', 'text-red', 'text-orange', 'text-amber', 'text-yellow', 'text-lime', 'text-green', 'text-emerald', 'text-teal', 'text-cyan', 'text-sky', 'text-blue', 'text-indigo', 'text-violet', 'text-purple', 'text-fuchsia', 
    'text-pink', 'text-rose', 'bg-black', 'bg-slate', 'bg-lightslate', 'bg-stone', 'bg-red', 'bg-orange', 'bg-amber', 'bg-yellow', 'bg-lime', 'bg-green', 'bg-emerald', 'bg-teal', 'bg-cyan', 'bg-sky', 'bg-blue', 'bg-indigo', 'bg-violet', 'bg-purple', 'bg-fuchsia', 
    'bg-pink', 'bg-rose'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      DEFAULT: '#fae8ff',
      'black': '#000000',
      'white': '#ffffff',
      'slate': '#475569',
      'lightslate': '#64748b',
      'stone': '#57534e',
      'red': '#dc2626',
      'orange': '#ea580c',
      'amber': '#d97706',
      'yellow': '#ca8a04',
      'lime': '#65a30d',
      'green': '#16a34a',
      'emerald': '#059669',
      'teal': '#0d9488',
      'cyan': '#0891b2',
      'sky': '#0284c7',
      'blue': '#2563eb',
      'indigo': '#4f46e5',
      'violet': '#7c3aed',
      'purple': '#9333ea',
      'fuchsia': '#c026d3',
      'pink': '#db2777',
      'rose': '#e11d48',
    },
    extend: {},
    screens: {
      sm: "640px", // Small devices (e.g., phones)
      md: "768px", // Medium devices (e.g., tablets)
      lg: "1024px", // Large devices (e.g., desktops)
      xl: "1280px", // Extra-large devices
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

