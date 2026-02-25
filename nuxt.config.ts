import env from "./app/lib/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },

	modules: ['@nuxt/ui', '@nuxtjs/color-mode'],
	colorMode: {
		classSuffix: ''
	},
	devServer: {
		port: 3338
	},
	app: {
		head: {
			title: 'Nuxt Showcase 003',
			meta: [
				{ name: 'description', content: 'A Nuxt 4 site with responsive navigation and color mode' }
			]
		}
	},
	css: ['~/assets/css/main.css'],
	postcss: {
		plugins: {
			'@tailwindcss/postcss': {},
			autoprefixer: {}
		}
	},
	runtimeConfig: {
		public: {
			nodeEnv: env.NODE_ENV
		}
	}
})

