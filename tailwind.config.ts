import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        notification: {
          '10%': { opacity: '100%' },
          '90%': { opacity: '100%' },
          '100%': { opacity: '0%' },
        },
      },
      animation: {
        toast: 'notification 5s linear',
      },
    },
    plugins: [],
  },
};
export default config;
