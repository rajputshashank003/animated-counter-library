import { createRequire } from "module";
const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

import postcss from "rollup-plugin-postcss";
import tailwind from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

const externalDependencies = [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
    "framer-motion",
    "gsap",
    /^react(\/.*)?$/,
    /^react-dom(\/.*)?$/,
    /^framer-motion(\/.*)?$/,
    /^gsap(\/.*)?$/,
];

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
                exports: "named",
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
                exports: "named",
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            postcss({
                plugins: [tailwind(), autoprefixer()],
                inject: true,
                minimize: false,
            }),
            terser(),
        ],
        external: externalDependencies,
    },
    {
        input: "src/index.ts",
        output: [{ file: packageJson.types }],
        plugins: [dts.default()],
        external: [/\.css$/, ...externalDependencies],
    },
];