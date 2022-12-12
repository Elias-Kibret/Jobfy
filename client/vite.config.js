import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteCommonjs(), ""],
	build: {
		chunkSizeWarningLimit: 1000,
	},
	optimizeDeps: {
		include: ["styled-components"],
	},
	server: {
		proxy: {
			"/api/v1": "http://localhost:4000",
		},
	},
});
