const rimraf = require("rimraf");

const { distPath } = require("./var");
const { runRollup } = require("./rollup");
const { mainOption, copyFiles } = require("./main");
const { moduleOptions } = require("./modules");

function runBuild() {
  rimraf(distPath, {}, async () => {
    await Promise.all(Object.entries(moduleOptions).map(([name, option]) => {
      runRollup(option);
    }));
    await runRollup(mainOption);
    copyFiles();
  });
}

runBuild();
