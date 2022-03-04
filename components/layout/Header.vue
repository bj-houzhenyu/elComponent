<template>
  <Header class="ins-header" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </Header>
</template>

<script>
import { Header } from "element-ui";
export default {
  name: "InsLayoutHeader",
  components: { Header }
};
</script>
