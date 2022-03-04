<template>
  <MenuItemGroup class="ins-menu-item-group" v-bind="$attrs" v-on="$listeners">
    <slot name="title" slot="title"/>
    <slot/>
  </MenuItemGroup>
</template>

<script>
import { MenuItemGroup } from "element-ui";

export default {
  name: "InsMenuItemGroup",
  components: { MenuItemGroup }
};
</script>
