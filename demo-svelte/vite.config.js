import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from "path"

export default defineConfig({
	plugins: [sveltekit()],
  resolve: {
    alias: {
      "$assets": path.resolve("./src/assets"),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "$assets/global.scss";`,
      },
    },
  },
  server: {
    port: 5530,
  },
});
