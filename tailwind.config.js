/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/index.html"],
  safelist: [
    { pattern: /^row-start-/ },
    { pattern: /^row-span-/ },
    { pattern: /^col-start-/ },
    { pattern: /^col-span-/ },
  ],
};
