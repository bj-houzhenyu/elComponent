<template>
  <Dropdown ref="main" class="ins-dropdown" :trigger="trigger" v-bind="$attrs" v-on="$listeners">
    <slot/>
    <slot name="dropdown" slot="dropdown"/>
    <DropdownMenu slot="dropdown" v-if="showOptions">
      <template v-for="(option, index) in options">
        <DropdownItem :key="index" v-bind="option">{{option.label}}</DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import { Dropdown } from "element-ui";
import { refs } from "utils/mixins";
import DropdownMenu from "./DropdownMenu.vue";
import DropdownItem from "./DropdownItem.vue";

export default {
  name: "InsDropdown",
  components: { Dropdown, DropdownMenu, DropdownItem },
  mixins: [refs],
  props: {
    trigger: { type: String, default: "click" },
    options: { type: Array, default: () => [] }
  },
  computed: {
    showOptions() {
      return this.options.length > 0;
    }
  }
};
</script>
