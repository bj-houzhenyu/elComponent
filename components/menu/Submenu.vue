<template>
  <Submenu class="ins-submenu" v-bind="$attrs" v-on="$listeners">
    <slot name="title" slot="title"/>
    <slot/>
  </Submenu>
</template>

<script>
import { Submenu } from "element-ui";

export default {
  name: "InsSubmenu",
  components: { Submenu }
};
</script>
