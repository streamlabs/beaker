import { resolve, join } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: "tsconfig.json",
            cleanVueFileName: true,
            include: ["src/components/*.vue"],
            exclude: [
                "src/index.d.ts",
                "src/assets/**",
                "src/demos/**",
                "src/styles/**",
                "src/views/**"
            ],
            outDir: "dist"
        })
    ],
    resolve: {
        alias: {
            "@": join(__dirname, "src/")
        }
    },
    build: {
        minify: false,
        target: "chrome61",
        commonjsOptions: {
            requireReturnsDefault: true
        },
        lib: {
            entry: resolve(__dirname, "src/system.js"),
            name: "Beaker",
            fileName: format => `beaker.${format}.js`
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue"
                }
            }
        }
    }
});
