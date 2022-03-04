/**
 * 替换组件名称中的前缀
 * @param {string} prefix 前缀
 * @param {string} name 组件名称
 * @returns {string} 替换后的组件名称
 */
function replace(prefix, name) {
  return name.replace(/^Ins/, prefix);
}

/**
 * 生成 install 函数
 * @param {<VM>[]} components Vue Components
 * @returns {function} install function
 */
export function makeInstall(components) {
  if (!Array.isArray(components)) return makeInstall([components]);
  return function(Vue, option = {}) {
    const { prefix } = option;
    components.forEach(component => {
      const name = prefix ? replace(prefix, component.name) : component.name;
      Vue.component(name, component);
    });
  };
}
