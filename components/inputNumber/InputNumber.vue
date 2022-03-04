<template>
  <InputNumber ref="main" class="ins-input-number" :size="size" v-bind="$attrs" v-on="$listeners"/>
</template>

<script>
import { InputNumber } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsInputNumber",
  components: { InputNumber },
  mixins: [refs],
  props: {
    size: { type: String, default: "small" }
  }
};
</script>
