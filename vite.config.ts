import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // Compressão Brotli para arquivos .js/.css em produção
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      deleteOriginFile: false, // mantém os arquivos originais
    }),

    // Geração de visualização interativa do bundle (acessível via ./dist/stats.html)
    visualizer({
      filename: "./dist/stats.html",
      open: false, // pode usar true para abrir automaticamente após build
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // para usar "@/caminho" ao invés de "../../"
    },
  },

  build: {
    sourcemap: false, // desativa source maps na produção
    minify: "esbuild", // minificação rápida com esbuild (padrão do Vite)

    rollupOptions: {
      output: {
        // Divisão manual de chunks para reduzir JS inicial
        manualChunks: {
          react: ["react", "react-dom"],
          icons: ["react-icons/fa"],
          charts: ["recharts"],
          router: ["react-router-dom"],
          ui: ["react-toastify", "react-hook-form", "zustand"],
        },
      },
    },
  },
});
