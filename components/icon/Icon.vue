<template>
  <span class="ins-icon" :style="localCursor" @click="localClick" v-on="$listeners">
    <component v-if="isComponent" :is="name"/>
    <i v-else-if="isString" :style="dotStyle" :class="iconClass"/>
    <slot/>
  </span>
</template>

<script>
import { isFunction, isString } from "@insgeek/util";
import { Types } from "utils";

export default {
  name: "InsIcon",
  props: {
    type: { type: String, defualt: "default" },
    size: { type: String, default: "small" },
    cursor: { type: String, defualt: "default" },
    name: { type: [String, Object], default: "" },
    emit: { type: [Function, String], default: "" },
    dot: { type: String, default: "" }
  },
  computed: {
    localCursor() {
      return { 
        cursor: this.cursor || "default"
      };
    },
    dotStyle() {
      return Types.includes(this.dot) ? {} : { 
        background: this.dot
      };
    },
    isComponent() {
      return typeof this.name === "object";
    },
    isDot() {
      return !!this.dot;
    },
    isString() {
      return this.isDot || (typeof this.name === "string" && this.name.length > 0);
    },
    iconClass() {
      return {
        "ins-icon-item": true,
        [`el-icon-${this.name}`]: this.name,
        [this.name]: !this.isComponent,
        "ins-icon-dot": this.isDot,
        [`ins-icon-dot--${this.dot}`]: Types.includes(this.dot)
      };
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
