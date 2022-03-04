<template>
  <div ref="main" :class="bindClass">
    <div class="ins-form-base-input-group-prepend">
      <slot name="prepend" v-if="showPrepend"/>
      <BaseInput v-model="modelFirst" v-bind="first" @blur="onBlur"/>
    </div>
    <div class="ins-form-base-input-group-link">
      <slot name="link">{{link}}</slot>
    </div>
    <div class="ins-form-base-input-group-append">
      <slot name="append" v-if="showAppend"/>
      <BaseInput v-model="modelLast" v-bind="last" @blur="onBlur"/>
    </div>
  </div>
</template>

<script>
import { Sizes } from "utils";
import BaseInput from "./BaseInput.vue";
import { refs } from "utils/mixins";

export default {
  name: "InsFormBaseInputGroup",
  mixins: [refs],
  components: { BaseInput },
  props: {
    value: { type: Array, default: () => [] },
    link: { type: String, default: "-" },
    size: { type: String, default: "small" },
    options: { type: Array, default: () => [] },
    model: { type: Object, default: undefined }
  },
  computed: {
    localValue() {
      return this.value || [];
    },
    modelFirst: {
      get() { return this.localValue[0]; },
      set(value) { this.$emit("input", [value, this.modelLast]); }
    },
    modelLast: {
      get() { return this.localValue[1]; },
      set(value) { this.$emit("input", [this.modelFirst, value]); }
    },
    bindClass() {
      return {
        "ins-form-base-input-group": true,
        [`ins-form-base-input-group--${this.size}`]: Sizes.includes(this.size)
      };
    },
    showPrepend() {
      return this.$slots.prepend;
    },
    showAppend() {
      return this.$slots.append;
    },
    first() {
      const option = this.options[0] || {};
      const props = option.props || {};
      return { ...option, ...props, model: this.model };
    },
    last() {
      const option = this.options[1] || {};
      const props = option.props || {};
      return { ...option, ...props, model: this.model };
    }
  },
  methods: {
    onBlur() {
      this.$emit("blur", this.main);
    }
  }
};
</script>
