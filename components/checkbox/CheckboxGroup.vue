<template>
  <CheckboxGroup ref="main" :size="size" v-model="localValue" :class="bindClass" v-bind="$attrs" v-on="others">
    <slot/>
    <template v-for="(option, index) in options">
      <CheckboxButton v-if="showButton(option.type)" :key="index" v-bind="option"/>
      <Checkbox v-else :key="index" v-bind="option" :label="option.value" value="~">
        {{option.label}}
      </Checkbox>
    </template>
  </CheckboxGroup>
</template>

<script>
import { CheckboxGroup } from "element-ui";
import { refs } from "utils/mixins";
import { Sizes } from "utils";
import Checkbox from "./Checkbox.vue";
import CheckboxButton from "./CheckboxButton.vue";

export default {
  name: "InsCheckboxGroup",
  components: { CheckboxGroup, Checkbox, CheckboxButton },
  mixins: [refs],
  props: {
    size: { type: String, default: "small" },
    value: { type: Array, default: () => [] },
    options: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: true },
    vertical: { type: Boolean, default: false }
  },
  data() {
    const { input, ...others } = this.$listeners;
    return { others };
  },
  computed: {
    bindClass() {
      return {
        "ins-checkbox-group": true,
        "ins-checkbox-group-vertical": this.vertical,
        [`ins-checkbox-group--${this.size}`]: Sizes.includes(this.size)
      };
    },
    localValue: {
      get() { return this.value || []; },
      set(value) {
        if (this.multiple) this.$emit("input", value);
        else this.$emit("input", this.filterValue(value));
      }
    }
  },
  methods: {
    showButton(type) {
      return type === "button";
    },
    filterValue(value) {
      const next = value.length > 1
        ? value.filter(va => !this.value.includes(va))
        : value;
      return next;
    }
  }
};
</script>
