// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Pages for hosted apps are built at /apps/<slug>, but vercel.json serves them
// at <slug>.jeevanmishra.in and that subdomain is their canonical address, so
// the sitemap has to advertise the subdomain instead of the build path.
// jeevanmishra.in must be verified as a *domain* property in Search Console
// for this cross-host listing to be accepted.
const APP_PAGE = new RegExp('^https://jeevanmishra[.]in/apps/([^/]+)(/.*)?$');

// https://astro.build/config
export default defineConfig({
	site: 'https://jeevanmishra.in',
	integrations: [
		sitemap({
			serialize(item) {
				const match = item.url.match(APP_PAGE);
				if (!match) return item;

				const [, slug, path = ''] = match;
				const rest = path.endsWith('/') ? path.slice(0, -1) : path;
				item.url = `https://${slug}.jeevanmishra.in${rest || '/'}`;
				return item;
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
