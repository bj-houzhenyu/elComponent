<template>
  <Aside class="ins-aside" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </Aside>
</template>

<script>
import { Aside } from "element-ui";
export default {
  name: "InsAside",
  components: { Aside }
};
</script>
