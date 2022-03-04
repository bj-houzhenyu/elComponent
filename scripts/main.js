const fs = require("fs-extra")
const path = require("path")
const { cwd, distPath, distLibPath } = require("./var")
const { makePlugins } = require("./plugins")
const package = require(path.resolve(cwd, "./package.json"))

const externalPackages = [
  "vue",
  "element-ui",
  "@vue/composition-api",
  "@insgeek/util"
]
function external(module) {
  if (externalPackages.includes(module)) return true
  return /^element-ui.*$/.test(module)
}

const globals = {
  "vue": "vue",
  "@vue/composition-api": "CompositionAPI",
  "element-ui": "ElementUI",
  "element-ui/lib/transitions/collapse-transition": "ElementUI",
  "@insgeek/util": "utils"
}

function inputOption() {
  return Object.assign({
    input: path.resolve(cwd, "./src/index.js")
  }, { external, plugins: makePlugins(distLibPath) })
}

function outputOption() {
  return {
    file: path.join(distLibPath, "/index.js"),
    name: "ins-element",
    format: "esm",
    sourcemap: true,
    globals
  }
}

function makeMainOption() {
  return {
    input: inputOption(),
    output: outputOption()
  }
}

function copyFiles() {
  const readmePath = path.join(cwd, "/readme.md")
  fs.copyFile(readmePath, path.join(distPath, "/readme.md"))
  fs.writeFile(path.join(distPath, "/package.json"), JSON.stringify({
    name: package.name,
    version: package.version,
    description: package.description,
    main: "lib/index.js",
    files: ["lib", "readme.md", "package.json"],
    repository: package.repository,
    homepage: package.homepage,
    bugs: package.bugs,
    author: package.author,
    license: package.license,
    publishConfig: package.publishConfig,
    devDependencies: {},
    peerDependencies: package.peerDependencies
  }, null, 2))
}

module.exports = {
  mainOption: makeMainOption(),
  external,
  globals,
  copyFiles
}
