import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The site lives at /kept/; root/ (copied to dist/ by the build script) holds the root's redirect and Search Console file.
export default defineConfig({
  base: "/kept/",
  build: { outDir: "dist/kept" },
  plugins: [react(), tailwindcss()],
});
