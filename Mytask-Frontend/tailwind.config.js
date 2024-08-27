/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      fontFamily: {
      'dm-sans': ['"DM Sans"', 'sans-serif'],
    },
  screens:{
    'mobile': '640px',
  }},
  },
  plugins: [],
}