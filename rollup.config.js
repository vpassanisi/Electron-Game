import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

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
      resolve({ preferBuiltins: false, browser: true }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
];
