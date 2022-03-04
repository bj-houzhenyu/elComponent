<template>
  <Card :class="bindClass" :title="title" :icon="false" :size="none">
    <slot slot="title"></slot>
    <slot slot="title-bar" name="title-bar"/>
  </Card>
</template>

<script>
import { Sizes } from "utils";
import Card from "../card/Card.vue";

export default {
  name: "InsHeader",
  components: { Card },
  props: {
    title: { type: String, default: undefined },
    size: { type: String, default: "small" }
  },
  computed: {
    bindClass() {
      return ["ins-header", {
        [`ins-header--${this.size}`]: Sizes.includes(this.size)
      }];
    }
  }
};
</script>
