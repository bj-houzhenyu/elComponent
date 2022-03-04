<template>
  <Checkbox ref="main" class="ins-checkbox" :size="size" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </Checkbox>
</template>

<script>
import { Checkbox } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsCheckbox",
  components: { Checkbox },
  mixins: [refs],
  props: {
    size: { type: String, default: "small" }
  }
};
</script>
