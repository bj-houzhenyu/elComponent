<template>
  <Tooltip ref="main" class="ins-tooltip" v-bind="$attrs" v-on="$listeners">
    <slot name="content" slot="content"/>
    <slot/>
  </Tooltip>
</template>

<script>
import { Tooltip } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsTooltip",
  components: { Tooltip },
  mixins: [refs]
};
</script>
