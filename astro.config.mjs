// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "http://bisu-us.com",
  vite: {
    ssr: {
      external: ["svgo"]
    },
    server: {
      host: "0.0.0.0"
    }
  },
  server: {
    host: true
  },
  integrations: [tailwind()]
});