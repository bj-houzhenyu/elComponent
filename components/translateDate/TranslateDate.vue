<template>
  <div class="ins-translate-date">
    <slot>{{formatValue}}</slot>
  </div>
</template>

<script>
import { isNilEmpty, parseDate } from "@insgeek/util";

export default {
  name: "InsTranslateDate",
  props: {
    value: { type: [Object, String, Number], default: "" },
    format: { type: String, default: "yyyy-MM-dd hh:mm:ss" },
    none: { type: String, default: "-" }
  },
  computed: {
    formatValue() {
      return isNilEmpty(this.value) ? this.none : parseDate(this.value, this.format);
    }
  }
};
</script>
