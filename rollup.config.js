import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import postcss from "rollup-plugin-postcss";
import autoPreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/main/index.js",
    output: {
      file: "dist/main.js",
      format: "cjs",
    },
  },
  {
    input: "src/renderer/index.ts",
    output: {
      file: "dist/renderer.js",
      format: "es",
    },
    plugins: [
      svelte({ compilerOptions: { dev: !production }, preprocess: autoPreprocess() }),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({ plugins: [require("tailwindcss")("./tailwind.config.js")] }),
      resolve({ preferBuiltins: false, browser: true }),
      commonjs(),
    ],
  },
];
