<template>
  <Popconfirm ref="main" class="ins-popover-confirm" v-bind="$attrs" v-on="$listeners">
    <slot name="reference" slot="reference"/>
  </Popconfirm>
</template>

<script>
import { Popconfirm } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsPopconfirm",
  components: { Popconfirm },
  mixins: [refs]
};
</script>
