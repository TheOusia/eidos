import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import vike from "vike/plugin";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

export default defineConfig({
	plugins: [
		vike(),
		tailwindcss(),
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.startsWith("md-"),
				},
			},
		}),
	],
	build: {
		target: "es2022",
	},
	resolve: {
		alias: [
			{
				find: "@assets",
				replacement: fileURLToPath(new URL("./assets", import.meta.url)),
			},
			{
				find: "@components",
				replacement: fileURLToPath(new URL("./components", import.meta.url)),
			},
			{
				find: "@pages",
				replacement: fileURLToPath(new URL("./pages", import.meta.url)),
			},
			{
				find: "@src",
				replacement: fileURLToPath(new URL("./src", import.meta.url)),
			},
		],
	},
});
