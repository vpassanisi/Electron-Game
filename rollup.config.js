import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/main/index.ts",
    output: {
      file: "dist/main.js",
      format: "cjs",
    },
    plugins: [
      resolve({ preferBuiltins: false, browser: true }),
      json(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "src/main/preload.ts",
    output: {
      file: "dist/preload.js",
      format: "es",
    },
    plugins: [
      resolve({ preferBuiltins: false, browser: true }),
      json(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "src/renderer/index.ts",
    output: {
      file: "dist/renderer.js",
      format: "es",
    },
    plugins: [
      resolve({ preferBuiltins: false, browser: true }),
      json(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
];
