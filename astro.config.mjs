import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: "https://bisu-en.com",
  server: {
	  host: true
  },
  vite: {
    ssr: {
      external: ['svgo']
    },
    server: {
      host: '0.0.0.0'
    }
  }
});