const packageJson = require('./package.json');

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

import postcss from "rollup-plugin-postcss";
import tailwind from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            postcss({
                plugins: [tailwind(), autoprefixer()],
                extract: 'styles.css', // this will create dist/styles.css
                minimize: true,
            }),
            terser(),
        ],
        external: ["react", "react-dom"],
    },
    {
        input: "src/index.ts",
        output: [{ file: packageJson.types }],
        plugins: [dts.default()],
    },
];