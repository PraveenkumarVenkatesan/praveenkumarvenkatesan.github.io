// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { componentTagger } from "lovable-tagger";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   server: {
//     host: "::",
//     port: 8080,
//   },
//   plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// }));


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// Copies dist/index.html to dist/404.html after build so GitHub Pages
// serves the SPA for deep links (e.g. /blogs) instead of a 404.
const spa404Fallback = () => ({
  name: "spa-404-fallback",
  closeBundle() {
    const dist = path.resolve(__dirname, "dist");
    const index = path.join(dist, "index.html");
    if (fs.existsSync(index)) {
      fs.copyFileSync(index, path.join(dist, "404.html"));
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Served as a GitHub user page (praveenkumarvenkatesan.github.io) at the root.
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger(), spa404Fallback()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

