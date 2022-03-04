<template>
  <Option class="ins-option" v-bind="$attrs" v-on="$listeners"/>
</template>

<script>
import { Option } from "element-ui";

export default {
  name: "InsOption",
  components: { Option }
};
</script>
