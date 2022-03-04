<template>
  <div :class="bindClass">
    <Select ref="main" popper-class="ins-select-dropdown" :size="size" v-bind="$attrs" v-on="$listeners">
      <slot/>
      <template v-for="(option, index) in options">
        <Option :key="index" v-bind="option"/>
      </template>
      <slot name="prefix" slot="prefix"/>
      <slot name="empty" slot="empty"/>
    </Select>
    <span class="ins-select__unit">{{unit}}</span>
  </div>
</template>

<script>
import { Sizes } from "utils";
import { Select } from "element-ui";
import { refs } from "utils/mixins";
import Option from "./Option.vue";

export default {
  name: "InsSelect",
  components: { Select, Option },
  mixins: [refs],
  props: {
    size: { type: String, default: "small" },
    options: { type: Array, default: () => [] },
    unit: { type: String, default: "" }
  },
  computed: {
    showUnit() {
      return this.unit;
    },
    bindClass() {
      return {
        "ins-select": true,
        "ins-select-unit": this.showUnit,
        [`ins-select--${this.size}`]: Sizes.includes(this.size)
      };
    }
  }
};
</script>
