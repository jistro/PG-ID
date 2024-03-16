/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		keyframes: {
		},
		fontFamily: {
			sans: ['var(--font-londrina)'],
		},
		colors: {
		  "nouns": {
			pastel: "#E5DDDB",
		  },
		},
		backgroundImage: {
			'nouns-blue': "url('/bg.svg')",
		},
	  },
	},
  };