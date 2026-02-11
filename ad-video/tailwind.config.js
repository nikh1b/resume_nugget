/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                nugget: '#bef264', // lime-300
                brand: '#ef4444', // red-500
            }
        },
    },
    plugins: [],
};
