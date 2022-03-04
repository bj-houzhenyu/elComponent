<template>
  <div class="ins-translate">
    <slot
      v-for="(option, index) in translateOptions"
      :option="option"
      :value="translateValue(option)"
      :label="translateLebal(option)"
      :index="index"
      :first="index === 0"
      :last="isLast(index)"
      :length="translateOptions.length"
    >
      {{translateLebal(option)}}{{!isLast(index) ? link : ""}}
    </slot>
  </div>
</template>

<script>
import { isNilEmpty } from "@insgeek/util";

/**
 * 默认 filter 函数
 * 自定义 filter 函数时 应返回翻译的数组
 * @param {any | array} values 值 如过不出数组 会转为数组
 * @param {array} options 字典
 * @param {object} option 参数配置
 * @return {array} 字典对应的翻译
 */
function filter(values, options, none) {
  const _values = Array.isArray(values) ? values : [values];
  if (_values.length < 1) return [none];
  return _values.map(value => {
    return options.find(op => {
      return "" + op.value === "" + value;
    }) || value;
  });
}

export default {
  name: "InsTranslate",
  props: {
    value: { type: [Array, String, Number], default: () => [] },
    options: { type: Array, default: () => [] },
    filter: { type: Function, default: filter },
    none: { type: String, default: "-" },
    link: { type: String, default: "," }
  },
  computed: {
    translateOptions() {
      return this.filter(this.value, this.options, this.none);
    }
  },
  methods: {
    translateValue(option) {
      if (typeof option === "object") return option.value;
      else return option;
    },
    translateLebal(option) {
      if (typeof option === "object") {
        if (!isNilEmpty(option.label)) return option.label;
        if (!isNilEmpty(option.value)) return option.value;
        return this.none;
      } else {
        return isNilEmpty(option) ? this.none : option;
      }
    },
    isLast(index) {
      return index >= this.translateOptions.length - 1;
    }
  }
};
</script>
