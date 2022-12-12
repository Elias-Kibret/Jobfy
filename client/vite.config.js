import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteCommonjs()],
	server: {
		proxy: {
			"/api/v1": "http://localhost:4000",
		},
	},
});
