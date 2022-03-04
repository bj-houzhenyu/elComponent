const fs = require("fs-extra");
const path = require("path");

const { external, globals } = require("./main");
const { componentsPath, distLibPath } = require("./var");
const { makePlugins } = require("./plugins");

function inputOption(name) {
  const inputPath = path.join(componentsPath, `/${name}/index.js`);
  const basePath = path.resolve(distLibPath, `./${name}`);
  try {
    fs.statSync(inputPath)
    return {
      input: inputPath,
      external,
      plugins: makePlugins(basePath)
    };
  } catch (error) {
    return undefined
  }
}

function outputOption(name) {
  return {
    file: path.join(distLibPath, `/${name}/index.js`),
    format: "esm",
    name: `ins-${name}`,
    sourcemap: true,
    globals
  };
}

function makeModuleOptions() {
  return fs.readdirSync(componentsPath).reduce((result, name) => {
    const input = inputOption(name)
    return input ? Object.assign(result, {
      [name]: {
        input,
        output: outputOption(name)
      }
    }) : result;
  }, {});
}

module.exports = {
  componentsPath,
  moduleOptions: makeModuleOptions()
};
