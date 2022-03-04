<template>
  <Radio ref="main" class="ins-radio" :size="size" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </Radio>
</template>

<script>
import { Radio } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsRadio",
  components: { Radio },
  mixins: [refs],
  props: {
    size: { type: String, default: "small" }
  }
};
</script>
