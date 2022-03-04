<template>
  <Main class="ins-main" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </Main>
</template>

<script>
import { Main } from "element-ui";
export default {
  name: "InsMain",
  components: { Main }
};
</script>
