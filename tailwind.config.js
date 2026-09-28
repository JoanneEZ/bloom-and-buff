/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush:     '#FCE7EC',
        blushSoft: '#FDF2F4',
        cream:     '#FFF9F5',
        pink:      '#FF6FA5',
        pinkDeep:  '#E85A8E',
        plum:      '#3D1F2B',
        ink:       '#1A1A1A',
        muted:     '#6B6B6B',
        gold:      '#C9A961',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans:  ['Poppins', 'sans-serif'],
        script: ['Dancing Script', 'cursive'], 
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '32px',
      },
    },
  },
  plugins: [],
}