const path = require("path");

const cwd = process.cwd();
const themPath = path.join(cwd, "/style/theme");
const exportPath = path.join(cwd, "/style/var");
const componentsPath = path.resolve(cwd, "./components");
const distPath = path.resolve(cwd, "./dist");
const distLibPath = path.join(distPath, "./lib");

module.exports = {
  cwd,
  themPath,
  exportPath,
  componentsPath,
  distPath,
  distLibPath
};
