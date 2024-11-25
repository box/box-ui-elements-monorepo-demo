import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// was necessary to add this plugin to fix the error globals is undefined"
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
});
