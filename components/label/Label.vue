<template>
  <div :class="bindClass" v-bind="$attrs" v-on="$listeners">
    <slot>{{localValue}}</slot>
  </div>
</template>

<script>
import { isNilEmpty } from "@insgeek/util";
import { Sizes } from "utils";

export default {
  name: "InsLabel",
  props: {
    value: { type: [Object, Array, String, Number], default: "" },
    unit: { type: String, default: "" },
    unitPosition: { type: String, defualt: "after" },
    none: { type: String, default: "-" },
    line: { type: Boolean, default: false },
    size: { type: String, default: "small" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false }
  },
  computed: {
    localValue() {
      const value = this.value.toString() || this.none;
      if (isNilEmpty(this.unit)) return value;
      else if (this.unitPosition === "before") return `${this.unit}${value}`;
      else return `${value}${this.unit}`;
    },
    bindClass() {
      return {
        "ins-label": true,
        "ins-label-line": this.line,
        "ins-label-disabled": this.disabled,
        "ins-label-readonly": this.readonly,
        [`ins-label--${this.size}`]: Sizes.includes(this.size)
      };
    }
  }
};
</script>
