<template>
  <Menu :class="menuClass" v-bind="$attrs" v-on="$listeners">
    <slot/>
    <template v-for="(item, index) in options">
      <MenuLoop :item="item" :key="index">
        <slot name="title" slot="title"/>
      </MenuLoop>
    </template>
  </Menu>
</template>

<script>
import { Menu } from "element-ui";
import { Sizes } from "utils";
import MenuLoop from "./MenuLoop.vue";

export default {
  name: "InsMenu",
  components: { Menu, MenuLoop },
  props: {
    size: { type: String, default: "small" },
    options: { type: Array, default: () => [] }
  },
  computed: {
    menuClass() {
      return {
        "ins-menu": true,
        [this.size]: Sizes.includes(this.size)
      };
    }
  }
};
</script>
