<template>
  <Cascader ref="main" :size="size" class="ins-cascader" v-bind="$attrs" v-on="$listeners">
    <slot/>
    <slot name="empty" slot="empty"/>
  </Cascader>
</template>

<script>
import { Cascader } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsCascader",
  components: { Cascader },
  mixins: [refs],
  props: {
    size: { type: String, default: "small" }
  }
};
</script>
