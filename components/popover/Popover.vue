<template>
  <Popover ref="main" class="ins-popover" v-bind="$attrs" v-on="$listeners">
    <slot/>
    <slot name="reference" slot="reference"/>
  </Popover>
</template>

<script>
import { Popover } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsPopover",
  components: { Popover },
  mixins: [refs]
};
</script>
