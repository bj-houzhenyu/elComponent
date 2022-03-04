<template>
  <Tree ref="main" class="ins-tree" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </Tree>
</template>

<script>
import { Tree } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsTree",
  components: { Tree },
  mixins: [refs]
};
</script>
