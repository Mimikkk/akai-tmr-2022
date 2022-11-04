const preset = require('@sots/tailwind');

// Tailwind does not support ESM yet, so we need to use CommonJS
// https://github.com/tailwindlabs/tailwindcss/issues/8283

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/index.html'],
  safelist: [
    { pattern: /^row-start-/ },
    { pattern: /^row-span-/ },
    { pattern: /^col-start-/ },
    { pattern: /^col-span-/ },
  ],
};
