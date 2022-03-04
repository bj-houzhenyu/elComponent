<template>
  <DropdownItem ref="main" class="ins-dropdown-item" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </DropdownItem>
</template>

<script>
import { DropdownItem } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsDropdownItem",
  components: { DropdownItem },
  mixins: [refs]
};
</script>
