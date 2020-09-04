import copy from "rollup-plugin-copy"
import serve from "rollup-plugin-serve"
import svelte from "rollup-plugin-svelte"
import replace from "rollup-plugin-replace"
import {terser} from "rollup-plugin-terser"
import commonjs from "@rollup/plugin-commonjs"
import autoPreprocess from "svelte-preprocess"
import resolve from "@rollup/plugin-node-resolve"
import livereload from "rollup-plugin-livereload"
import typescript from "@rollup/plugin-typescript"

const path = "dist"

const config = {
    input: "src/index.js",
    output: {
        file: `${path}/bundle.js`,
        sourcemap: process.env.ROLLUP_WATCH,
    },
    plugins: [
        svelte({
            dev: process.env.ROLLUP_WATCH,
            preprocess: autoPreprocess(),
        }),
        resolve({browser: true}),
        replace({
            BASE_URL: process.env.ROLLUP_WATCH
                ? "http://localhost:8888"
                : "https://murphee.netlify.app",
        }),
        commonjs(),
        typescript({sourceMap: process.env.ROLLUP_WATCH}),
        copy({targets: [{src: "static/*", dest: path}]}),
        !process.env.ROLLUP_WATCH && terser(),
        process.env.ROLLUP_WATCH &&
            serve({
                contentBase: path,
                port: 5000,
                historyApiFallback: true,
            }),
        process.env.ROLLUP_WATCH && livereload(path),
    ],
}

export default config
