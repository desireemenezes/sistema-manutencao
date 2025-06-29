import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // Compressão Gzip e Brotli para produção
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),

    // Visualização do tamanho dos chunks (acessar em /stats.html)
    visualizer({
      filename: "./dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    sourcemap: false,

    // Divisão de chunks para evitar bundles grandes
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          icons: ["react-icons/fa"], // Adapte com base no que usa
        },
      },
    },

    // Habilita compressão e otimizações adicionais
    minify: "esbuild", // padrão já eficiente
  },
});
