const fs = require("fs");
const path = require("path");
const colors = require("colors-console");
const { runRollup } = require("./rollup");
const { componentsPath, moduleOptions } = require("./modules");
const { cwd } = require("./var");
const { mainOption } = require("./main");

const mainPaths = [
  path.resolve(cwd, "./src"),
  path.resolve(cwd, "./utils")
]

function throttle(callback, layout = 400) {
  let t = undefined;
  function throttle(...args) {
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      callback.apply(this, args);
    }, layout);
  }
  throttle.clear = function() {
    if (t) clearTimeout(t);
  };
  return throttle;
}

function useTempstamp() {
  function tempstamp() {
    if (tempstamp.start) {
      const start = tempstamp.start;
      delete tempstamp.start;
      return (new Date().getTime() - start) / 1000;
    } else return tempstamp.start = new Date().getTime();
  }
  tempstamp.start = new Date().getTime();
  return tempstamp;
}

const rollupCallbacks = {
  onStart: (context) => {
    const { name } = context;
    context.timestamp = useTempstamp();
    process.stdout.write(colors("yellow", `Building ${name} ... \n`));
  },
  onFinish: (context) => {
    process.stdout.write(colors("blue", `Done in ${context.timestamp()}s \n`));
  }
};

async function buildModule(name) {
  try {
    if (moduleOptions[name]) await runRollup(moduleOptions[name], rollupCallbacks);
    else if (name === "all") {
      for (const module in moduleOptions) {
        await runRollup(moduleOptions[module], rollupCallbacks);
      }
    }
    await runRollup(mainOption, rollupCallbacks);
    return true;
  } catch (e) {
    process.stdout.write(colors("red", `${e} \n\n`));
    return false;
  }
}

// watch components
fs.readdirSync(componentsPath).forEach(name => {
  const modulePath = path.join(componentsPath, name);
  fs.watch(modulePath, throttle(async (eventType, filename) => {
    const timestamp = useTempstamp();
    process.stdout.write(colors("yellow", `${eventType} => ${filename}...\n`));
    if (await buildModule(name)) {
      process.stdout.write(colors("blue", `Done in ${timestamp()}s \n\n`));
    }
  }));
});
// watch src
mainPaths.forEach(path => {
  fs.watch(path, throttle(async (eventType, filename) => {
    const timestamp = useTempstamp();
    process.stdout.write(colors("yellow", `${eventType} => ${filename}...\n`));
    if (await buildModule()) {
      process.stdout.write(colors("blue", `Done in ${timestamp()}s \n\n`));
    }
  }));
})
