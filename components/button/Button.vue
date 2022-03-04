<template>
  <Button :class="buttonClass" :size="size" :type="localType" @click="localClick" v-bind="$attrs" v-on="$listeners">
    <slot>{{localTitle}}</slot>
  </Button>
</template>

<script>
import { Button } from "element-ui";
import { isFunction, isString } from "@insgeek/util";
import { Types } from "utils";

const textType = [
  "text",
  "text-primary",
  "text-success",
  "text-warning",
  "text-danger",
  "text-info"
];

export default {
  name: "InsButton",
  components: { Button },
  props: {
    type: { type: String, defualt: "default" },
    size: { type: String, default: "small" },
    title: { type: [Function, String], default: "" },
    emit: { type: [Function, String], default: "" },
    onClick: { type: Function }
  },
  computed: {
    textType() {
      return textType.includes(this.type);
    },
    localType() {
      if (this.textType) return "text";
      if (Types.includes(this.type)) return this.type;
      return "default";
    },
    buttonClass() {
      return {
        "ins-button": true,
        "ins-button-text": this.textType,
        [`ins-button-text--${this.type}`]: this.textType
      };
    },
    localTitle() {
      if (typeof this.title === "function") return this.title();
      else return this.title || "";
    }
  },
  methods: {
    localClick(event) {
      if (this.$listeners.click) return;
      if (isFunction(this.onClick)) this.onClick(event);
      else if (isFunction(this.emit)) this.emit(event);
      else if (isString(this.emit)) this.$emit(this.emit, event);
      else this.$emit("click", event);
    }
  }
};
</script>
