<template>
  <DropdownMenu ref="main" class="ins-dropdown-menu" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </DropdownMenu>
</template>

<script>
import { DropdownMenu } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsDropdownMenu",
  components: { DropdownMenu },
  mixins: [refs]
};
</script>
