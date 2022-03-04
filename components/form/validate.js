import { trim, isNilEmpty, isObject, isString, isArray, isFunction, isNumber, parseDate, parseNumber } from "@insgeek/util";

export const Regs = {
  number: { regular: /^-?\d+(\.\d+)?$/, name: "数字" },
  positiveNumber: { regular: /^\d+(\.\d+)?$/, name: "正数" },
  positiveInteger: { regular: /^((?!0)\d+|0)$/, name: "正整数" },
  telephone: { regular: /^([\d]{0,4}-)?[\d]{7,8}|400-[\d]{3}-[\d]{4}$/ },
  cellphone: { regular: /^1[3-9]\d{9}$/ },
  zip: { regular: /^[\d-]{5,10}$/ },
  email: { regular: /^([\w|-]+\.)*[\w|-]+@[\w|-]+(\.[\w]+)+$/ }
};

function checkFixed(value, { max = 2, min = 0 }) {
  return new RegExp(`\\.\\d{${min},${max}}$`).test(value);
}

/**
 * 验证必填和trim后必填
 * @param {string} title 字段名称
 * @returns { validator } el-form 验证格式
 */
export function checkEmpty(title, option) {
  if (isObject(title) && arguments.length === 1) {
    option = title;
  } else {
    option = Object.assign({ title }, option);
  }
  const {
    title: localTitle = title || "",
    group,
    equal,
    max,
    min,
    message,
    trigger = "change"
  } = option;
  const errorMessage = new Error(message || `${localTitle}不能为空`);

  return {
    required: true,
    validator: function(rule, value, callback) {
      if (isNilEmpty(value)) {
        callback(errorMessage);
        return;
      }

      if (isArray(value)) {
        const filter = value.filter(item => !isNilEmpty(item));
        const bo = group === true ? filter.length === 2 : filter.length > 0;
        if (!bo) {
          callback(errorMessage);
          return;
        }
      }

      if (isString(value)) {
        const length = value.trim().length;
        if (length < 1) {
          callback(errorMessage);
          return;
        }
        const result = fnCheckLength(localTitle, value, { equal, max, min });
        if (result !== true) {
          callback(result);
          return;
        }
      }

      callback();
    },
    trigger
  };
}

function fnCheckLength(title, value, option) {
  const { equal, max, min } = option;
  const length = value.trim().length;
  if (!isNilEmpty(equal) && length !== equal) {
    return new Error(`${title}长度必须为${equal}`);
  }
  if (!isNilEmpty(max) && length > max) {
    return new Error(`${title}长度不能大于${max}`);
  }
  if (!isNilEmpty(min) && length < min) {
    return new Error(`${title}长度不能小于${min}`);
  }
  return true;
}

export function checkLength(title, option) {
  if (isObject(title) && arguments.length === 1) {
    option = title;
  } else {
    option = Object.assign({ title }, option);
  }
  const { title: localTitle = title || "", trigger = "change" } = option;
  return {
    validator: function(rule, value, callback) {
      if (isNilEmpty(value) || value.length < 1) {
        callback();
        return;
      }

      const result = fnCheckLength(localTitle, value, option);
      if (result !== true) {
        callback(result);
        return;
      }

      callback();
    },
    trigger
  };
}

function formatData(data) {
  let result = parseNumber(data);
  if (isNumber(result)) return result;
  result = parseDate(data);
  if ((result || {}).constructor === Date) return result.getTime();
  return data;
}

/**
 * group 验证
 * @param {string|function} sort lt lte gt gte eq
 * @param {string} left 错误提示
 * @param {string} right 错误提示
 * @returns { validator } el-form 验证格式
 */
export function checkRange(sort = "lt", left = "最小值", right = "最大值", option) {
  if (isObject(sort) && arguments.length === 1) {
    option = sort;
  } else {
    option = Object.assign({ sort, title: [left, right] }, option);
  }
  const { sort: localSort = sort, title = [], trigger = "change" } = option;
  const [localLeft = "", localRight = ""] = title;

  return {
    validator: function(rule, value, callback) {
      if (!isArray(value) || value.length < 1) {
        callback();
        return;
      }

      if (isFunction(localSort)) {
        localSort(rule, value, callback);
        return;
      }

      let bo = true;
      let message = "";
      const v1 = formatData(value[0]);
      const v2 = formatData(value[1]);
      switch (localSort) {
        case "lt":
          bo = v1 < v2;
          message = `${localLeft}必须小于${localRight}`;
          break;
        case "lte":
          bo = v1 <= v2;
          message = `${localLeft}不能大于${localRight}`;
          break;
        case "gt":
          bo = v1 > v2;
          message = `${localLeft}必须大于${localRight}`;
          break;
        case "gte":
          bo = v1 >= v2;
          message = `${localLeft}不能小于${localRight}`;
          break;
        case "eq":
          bo = v1 === v2;
          message = `${localLeft}不等于${localRight}`;
          break;
        default:
          bo = false;
          break;
      }

      if (!bo) callback(new Error(message));
      else callback();
    },
    trigger
  };
}

/**
 * 验证数字
 * @param {string} fieldName 字段名称
 * @param {RegsItem} option 正则
 * @returns { validator } el-form 验证格式
 */
export function checkNumber(title, option) {
  if (isObject(title) && arguments.length === 1) {
    option = title;
  } else {
    option = Object.assign({ title }, option);
  }
  const {
    title: localTitle = title || "",
    max,
    min,
    fixed,
    reg = Regs.number,
    trigger = "change",
    group
  } = option;

  return {
    validator: function(rule, value, callback) {
      // check trim
      const trimedValue = trim(value);
      const checkValues = (isArray(trimedValue) ? trimedValue : [trimedValue]).filter(item => item).map(item => item.toString());
      if ((group === true && checkValues.length < 1) || isNilEmpty(checkValues[0])) {
        callback();
        return;
      }

      const { regular, name } = reg;
      for (const checkValue of checkValues) {
        // check number
        if (!regular.test(checkValue)) {
          callback(new Error(`${localTitle}只能填写为${name}`));
          return;
        }

        // check fixed
        if (checkValue.includes(".") && typeof fixed === "number" && fixed >= 0) {
          if (fixed === 0) {
            callback(new Error(`${localTitle}不能填写小数`));
            return;
          }
          if (!checkFixed(checkValue, { max: fixed })) {
            callback(new Error(`${localTitle}只能包含${fixed}位小数`));
            return;
          }
        }
  
        // check max min
        const formatValue = parseFloat(checkValue, 10);
        if (typeof max === "number" && formatValue > max) {
          callback(new Error(`${localTitle}不能大于${max}`));
          return;
        }
        if (typeof min === "number" && formatValue < min) {
          callback(new Error(`${localTitle}不能小于${min}`));
          return;
        }
      }

      callback();
    },
    trigger
  };
}

/**
 * 验证正整数
 * @param {string} fieldName 字段名称
 * @param {RegsItem} option 正则
 * @returns { validator } el-form 验证格式
 */
export function checkPositiveInteger(title, option) {
  if (isObject(title) && arguments.length === 1) {
    option = title;
  } else {
    option = Object.assign({ title }, option);
  }
  return checkNumber({ ...option, reg: Regs.positiveInteger });
}

/**
 * 生成通用的正则验证函数
 * 匹配其中一个正则时 返回正确
 * 反之返回错误
 * @param {RegExp} reg 正则
 * @param {string} message 提示信息
 * @returns {function} 验证函数
 */
export function checkRegular(reg, message, option) {
  if (isObject(reg) && arguments.length === 1) {
    option = reg;
  } else {
    option = Object.assign({ reg, message }, option);
  }
  const {
    reg: localReg = reg,
    message: localMessage = message,
    trigger = "change"
  } = option;
  const regs = Array.isArray(localReg) ? localReg : [localReg];

  return {
    validator: function(rule, value, callback) {
      if (isNilEmpty(value)) {
        callback();
        return;
      }
      for (let i = 0; i < regs.length; i++) {
        const reg = regs[i];
        const regular = reg.regular || reg;
        if (regular.test(value)) {
          callback();
          return;
        }
      }
      callback(new TypeError(localMessage));
    },
    trigger
  };
}
