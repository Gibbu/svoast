/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				body: ['Inter', 'Roboto', 'Arial', 'sans-serif'],
				display: ['Manrope', 'Inter', 'Roboto', 'Arial', 'sans-serif']
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
