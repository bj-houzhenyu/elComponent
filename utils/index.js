/** default */
export const Sizes = ["mini", "small", "medium", "large"];
export const Types = ["primary", "success", "warning", "danger", "info"];

/**
 * 函数截流
 * @param {function} callback 回调函数
 * @param {number} layout 延迟
 * @returns {function} 截流函数
 */
export function throttle(callback, layout = 400) {
  let t = undefined;
  const throttle = function(...args) {
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      callback.apply(this, args);
    }, layout);
  };
  throttle.clear = function() {
    if (t) clearTimeout(t);
  };
  throttle.immediate = function() {
    throttle.clear();
    throttle();
  };
  return throttle;
}
