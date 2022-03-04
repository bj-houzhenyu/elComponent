<template>
  <div class="ins-menu-loop">
    <Submenu v-if="hasChildren(item)" :key="index">
      <slot name="title" :item="item">
        <div class="ins-menu-content">
          <Icon class="ins-menu-icon" :name="item.icon"/>
          <span class="ins-menu-title">{{item.title}}</span>
        </div>
      </slot>
      <template v-for="(child, index) in item.children">
        <InsMenuLoop :item="child" :key="index"/>
      </template>
    </Submenu>
    <MenuItem v-else :key="index" :index="item.path">
      <slot name="title" :item="item">
        <div class="ins-menu-content">
          <Icon class="ins-menu-icon" :name="item.icon"/>
          <span class="ins-menu-title">{{item.title}}</span>
        </div>
      </slot>
    </MenuItem>
  </div>
</template>

<script>
import Submenu from "./Submenu.vue";
import MenuItem from "./MenuItem.vue";
import Icon from "../icon/Icon.vue";

export default {
  name: "InsMenuLoop",
  components: { Submenu, MenuItem, Icon },
  props: {
    item: { type: Object, default: () => ({}) }
  },
  methods: {
    hasChildren(item) {
      return Array.isArray(item.children) && item.children.length > 0;
    }
  }
};
</script>
