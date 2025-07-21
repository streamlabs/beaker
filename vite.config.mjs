import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    // base: "/beaker/",
    resolve: {
        alias: {
            "@": path.join(__dirname, "src/")
        }
    },
    plugins: [vueDevTools(), vue()],
    build: {
        minify: false
        // sourcemap: true
        // commonjsOptions: {
        //     requireReturnsDefault: true
        // }
    }
});
