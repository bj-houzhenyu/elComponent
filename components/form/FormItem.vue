<template>
  <FormItem :class="formItemClass" v-bind="$attrs" v-on="$listeners" :style="formItemStyle">
    <template slot:label="scope">
      <slot name="label" :scope="scope"/>
    </template>
    <slot/>
  </FormItem>
</template>

<script>
import { Sizes } from "utils";
import { FormItem } from "element-ui";
import { isString, isNumber } from "@insgeek/util";

const RegGrid = /^(\d{0,})(\/(span)?(-?\d{0,}))?$/;

function makeGrid(grid) {
  if (grid === "full") return "full";
  const result = (grid || "").match(RegGrid);
  if (result) {
    const [, f,, span, l] = result;
    return `${f}${span ? `-${span}` : ""}${l ? `-${l}` : ""}`;
  }
}

export default {
  name: "InsFormItem",
  components: { FormItem },
  props: {
    options: { type: Array, default: () => [] },
    size: { type: String, default: "small" },
    width: { type: [Number, String], default: undefined },
    grid: { type: String, default: undefined }
    // row: { type: String, default: undefined },
  },
  computed: {
    makeGridClass() {
      const column = isString(this.grid) && this.grid.length > 0 ? makeGrid(this.grid) : undefined;
      // const row = makeGrid(this.row)
      const result = [];
      if (column) result.push(`ins-form--grid-column-${column}`);
      // if (row) result.push(`grid-row-${row}`)
      return result;
    },
    formItemClass() {
      return [this.makeGridClass, {
        "ins-form-item": true,
        [`ins-form-item--${this.size}`]: Sizes.includes(this.size)
      }];
    },
    formItemStyle() {
      return {
        width: isNumber(this.width) ? `${this.width}px` : this.width
      };
    }
  }
};
</script>
