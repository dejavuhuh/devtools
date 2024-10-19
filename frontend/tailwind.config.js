/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--ant-color-primary)',
        'secondary': 'var(--ant-color-text-description)',
        'info': 'var(--ant-color-info-bg)',
        'info-hover': 'var(--ant-color-info-bg-hover)',
      },
    },
  },
  plugins: [],
}
