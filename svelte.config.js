import adapter from '@sveltejs/adapter-node';
import preprocess from "svelte-preprocess";
import tailwind from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import typescript from '@rollup/plugin-typescript';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    target: "#svelte",
    preprocess: preprocess({
        postcss: {
            plugins: [
                tailwind, 
                autoprefixer
            ]
        }
    }),	
	kit: {
		adapter: adapter()
	}
};

export default config;
