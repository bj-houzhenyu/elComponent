<template>
  <DatePicker ref="main" v-model="model" :class="bindClass" popper-class="ins-date-picker-poper" :size="size" :type="type" :format="format" :placeholder="placeholder" :defaultTime="defaultTime" v-bind="$attrs" v-on="action" @change="onChange"/>
</template>

<script>
import { DatePicker } from "element-ui";
import { parseDate } from "@insgeek/util";
import { refs } from "utils/mixins";

export default {
  name: "InsDatepicker",
  components: { DatePicker },
  mixins: [refs],
  props: {
    size: { type: String, default: "small" },
    value: { type: [Number, String, Date], default: undefined },
    type: { type: String, default: "date" },
    placeholder: { type: String, default: "请选择" },
    line: { type: Boolean, default: false },
    format: { type: String, defualt: undefined },
    defaultTime: { type: [String, Array], defaualt: undefined }
  },
  data() {
    const { change, ...others } = this.$listeners || {};
    return {
      fnChange: change,
      action: others
    };
  },
  computed: {
    bindClass() {
      return {
        "ins-date-picker": true,
        "ins-date-editor-line": this.line === true
      };
    },
    shouldFormatValue() {
      return this.type === "date" && this.defaultTime && !this.format;
    },
    model: {
      get() { return this.value; },
      set(value) {
        if (this.shouldFormatValue) {
          return this.formatDetaultTime(value);
        }
        return value;
      }
    }
  },
  methods: {
    formatDetaultTime(value) {
      const result = parseDate(value, "yyyy-MM-dd");
      if (result) return new Date(`${result} ${this.defaultTime}`);
      else return value;
    },
    onChange(value) {
      if (this.shouldFormatValue) {
        this.emitChange(this.formatDetaultTime(value));
      } else this.emitChange(value);
    },
    emitChange(value) {
      if (this.fnChange) this.fnChange(value);
      else this.$emit("change", value);
    }
  }
};
</script>
