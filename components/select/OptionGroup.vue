<template>
  <OptionGroup class="ins-option-group" v-bind="$attrs" v-on="$listeners"/>
</template>

<script>
import { OptionGroup } from "element-ui";

export default {
  name: "InsOptionGroup",
  components: { OptionGroup }
};
</script>
