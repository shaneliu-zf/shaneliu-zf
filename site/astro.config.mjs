import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://shaneliu.studio-alvitr.com",
  trailingSlash: "always",
  integrations: [sitemap()],
});
