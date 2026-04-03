import { defineConfig } from "vite";

export default defineConfig({
  root: "movie-finder",
  build: {
    outDir: "../dist",
    emptyOutDir: true
  }
});