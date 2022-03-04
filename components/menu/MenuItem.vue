<template>
  <MenuItem class="ins-menu-item" v-bind="$attrs" v-on="$listeners">
    <slot name="title" slot="title"/>
    <slot/>
  </MenuItem>
</template>

<script>
import { MenuItem } from "element-ui";

export default {
  name: "InsMenuItem",
  components: { MenuItem }
};
</script>
