<template>
  <span :class="bindClass" @click="onClick">
    <slot name="prefix"/>
    <span
      ref="input"
      :class="spanClass"
      :contenteditable="contenteditable"
      @input="onInput"
      @keydown="onKeydown"
      @blur="onBlur"
    />
    <span class="ins-line-input-unit" v-if="unit">{{unit}}</span>
    <slot name="suffix"/>
  </span>
</template>

<script>
import { isNilEmpty } from "@insgeek/util";
import { Sizes } from "utils";

export default {
  name: "InsLineInput",
  props: {
    value: { type: [String, Number], default: "" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    size: { type: String, default: "small" },
    unit: { type: String, default: undefined }
  },
  data() {
    return {
      contenteditable: false,
      localValue: this.value,
      prevValue: undefined
    };
  },
  computed: {
    showPlaceholder() {
      return !this.contenteditable && isNilEmpty(this.localValue);
    },
    nextContent() {
      return this.showPlaceholder ? this.placeholder : this.localValue;
    },
    localDisabled() {
      return this.disabled || this.readonly;
    },
    bindClass() {
      return ["ins-line-input", {
        "ins-line-input-unit": this.unit,
        [`ins-line-input--${this.size}`]: Sizes.includes(this.size),
        "ins-line-input-disabled": this.disabled,
        "ins-line-input-readonly": this.readonly
      }];
    },
    spanClass() {
      return ["ins-line-input-span", {
        "ins-line-input-span-placeholder": this.showPlaceholder,
        "ins-line-input-span-active": this.contenteditable
      }];
    }
  },
  watch: {
    value(next) {
      this.localValue = next;
    },
    localValue() {
      this.setInputContent();
    }
  },
  mounted() {
    this.setInputContent();
  },
  methods: {
    setContenteditable(bo) {
      if (typeof bo === "boolean") this.contenteditable = bo;
      else this.contenteditable = !this.contenteditable;
    },
    setInputContent() {
      this.$refs.input.textContent = this.nextContent;
    },
    onClick() {
      if (!this.contenteditable && !this.localDisabled) {
        this.setContenteditable(true);
        this.prevValue = this.localValue;
        this.$nextTick(() => {
          this.setInputContent();
          this.$refs.input.focus();
        });
      }
    },
    onKeydown(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    },
    onInput(event) {
      this.$emit("input", event.target.innerText);
    },
    onBlur(event) {
      if (this.contenteditable) {
        this.setContenteditable(false);
        if (this.prevValue !== event.target.textContent) {
          this.$emit("change", this.localValue);
        }
        if (this.localValue !== event.target.textContent) {
          this.localValue = event.target.textContent;
        }
        this.$emit("blur", this.localValue);
        this.$nextTick(() => {
          if (this.showPlaceholder) {
            this.setInputContent();
          }
        });
      }
    }
  }
};
</script>
