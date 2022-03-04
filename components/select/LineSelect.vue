<template>
  <LineLabelPopover
    class="ins-line-select"
    :size="size"
    :value="translateValue"
    :options="options"
    :checkStatus="checkStatus"
    :disabled="disabled"
    :readonly="readonly"
    :placeholder="placeholder"
    @blur="onBlur"
  >
    <CascaderPanel
      v-model="localValue"
      :options="options"
      :props="{ multiple, emitPath: false }"
    />
  </LineLabelPopover>
</template>

<script>
import { flatArray, isArray } from "@insgeek/util";
import LineLabelPopover from "../label/LineLabelPopover.vue";
import CascaderPanel from "../cascader/CascaderPanel.vue";

export default {
  name: "InsLineSelect",
  components: { LineLabelPopover, CascaderPanel },
  props: {
    size: { type: String, default: "small" },
    value: { type: [Array, String, Number], default: "" },
    autoChange: { type: Boolean, default: true },
    options: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: false },
    checkStatus: { type: String, default: "success" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    placeholder: { type: String, default: "" }
  },
  computed: {
    localValue: {
      get() { return this.formatValue(); },
      set(value) { this.$emit("input", this.formatReturnValue(value)); }
    },
    translateValue() {
      return this.multiple ? flatArray(this.localValue) : this.localValue;
    }
  },
  methods: {
    formatValue() {
      if (this.multiple) {
        return isArray(this.value) ? this.value : [this.value];
      } else {
        return isArray(this.value) ? this.value[0] : this.value;
      }
    },
    formatReturnValue(value) {
      if (this.multiple) {
        return isArray(value) ? flatArray(value) : [value];
      } else {
        return isArray(value) ? value[0] : value;
      }
    },
    onBlur() {
      this.$emit("change", this.localValue);
    }
  }
};
</script>
