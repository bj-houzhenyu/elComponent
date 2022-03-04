<template>
  <Divider class="ins-divider" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </Divider>
</template>

<script>
import { Divider } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsDivider",
  components: { Divider },
  mixins: [refs]
};
</script>
