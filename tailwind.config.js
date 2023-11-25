import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';


/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        colors: {
            'i-pink-500': '#E91E63',
            'i-pink-100': '#F8B9CF',
            'i-pink-300': '#F06896',
            'i-pink-50': '#FDE9EF',
            'i-yellow-500': '#FF9800',
            'i-orange-500': '#F44336',
            'white': '#ffffff',
        },
        extend: {
            fontFamily: {
                sans: 'poppins',
            },
        },
    },

    plugins: [forms],
};
