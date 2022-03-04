const path = require("path");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const eslint = require("@rollup/plugin-eslint");
const alias = require("@rollup/plugin-alias");
const vue = require("rollup-plugin-vue2");
const sass = require("rollup-plugin-sass");
const { terser } = require("rollup-plugin-terser");
const css = require("rollup-plugin-import-css");

const { cwd } = require("./var");

const env = process.env.NODE_ENV;
const customResolver = nodeResolve({ extensions: [".mjs", ".js", ".jsx", ".json", ".css", ".sass", ".scss"] });

function eslintPlugin() {
  return env === "production" ? [eslint({ throwOnError: true })] : [];
}

function terserPlugin() {
  return env === "production" ? [terser()] : [];
}

function sassPlugin(base) {
  return [sass({ output: path.resolve(base, "./index.css") })];
}

function makePlugins(base) {
  return [
    alias({
      entries: [
        { find: "components", replacement: path.resolve(cwd, "./components") },
        { find: "style", replacement: path.resolve(cwd, "./style") },
        { find: "utils", replacement: path.resolve(cwd, "./utils") }
      ],
      customResolver
    }),
    ...eslintPlugin(),
    vue({ css: false }),
    ...sassPlugin(base),
    css(),
    ...terserPlugin()
  ];
}

module.exports = { makePlugins };
