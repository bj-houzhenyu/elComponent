<template>
  <TimePicker ref="main" :class="bindClass" popper-class="ins-time-picker-poper" :size="size" :placeholder="placeholder" v-bind="$attrs" v-on="$listeners"/>
</template>

<script>
import { TimePicker } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsTimepicker",
  components: { TimePicker },
  mixins: [refs],
  props: {
    size: { type: String, default: "small" },
    placeholder: { type: String, default: "请选择" },
    line: { type: Boolean, default: false }
  },
  computed: {
    bindClass() {
      return {
        "ins-time-picker": true,
        "ins-date-editor-line": this.line === true
      };
    }
  }
};
</script>
