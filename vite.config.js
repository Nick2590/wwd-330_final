import { defineConfig } from "vite";

export default defineConfig({
  root: "movie-finder",
  base: "/wwd-330_final/",
  build: {
    outDir: "../docs",
    emptyOutDir: true
  }
});