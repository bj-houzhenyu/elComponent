<template>
  <Drawer ref="main" :class="bindClass" v-bind="$attrs" v-on="$listeners">
    <slot/>
    <slot name="title" slot="title"/>
  </Drawer>
</template>

<script>
import { Sizes } from "utils";
import { Drawer } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsDrawer",
  components: { Drawer },
  mixins: [refs],
  props: {
    // full: { type: Boolean, default: false },
    size: { type: String, default: "small" }
  },
  computed: {
    bindClass() {
      return ["ins-drawer", {
        // "ins-drawer-full": this.full,
        [`ins-drawer--${this.size}`]: Sizes.includes(this.size)
      }];
    }
  }
};
</script>
