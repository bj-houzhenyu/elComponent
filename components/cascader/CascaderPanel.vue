<template>
  <CascaderPanel ref="main" class="ins-cascader-panel" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </CascaderPanel>
</template>

<script>
import { CascaderPanel } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsCascaderPanel",
  components: { CascaderPanel },
  mixins: [refs]
};
</script>
