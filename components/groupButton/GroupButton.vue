<template>
  <div class="ins-group-button">
    <slot/>
    <template v-for="(button, index) in buttons">
      <Icon v-if="showIcon(button.name)" :name="button.name" v-bind="button" :key="button.key || index"/>
      <Button v-else v-bind="button" :key="button.key || index"/>
    </template>
  </div>
</template>

<script>
import { isObject } from "@insgeek/util";
import Button from "../button/Button.vue";
import Icon from "../icon/Icon.vue";

export default {
  name: "InsGroupButton",
  components: { Button, Icon },
  props: {
    buttons: { type: Array, default: () => [] }
  },
  methods: {
    showIcon(name) {
      return isObject(name);
    }
  }
};
</script>
