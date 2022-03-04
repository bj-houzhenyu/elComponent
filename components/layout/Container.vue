<template>
  <Container class="ins-container" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </Container>
</template>

<script>
import { Container } from "element-ui";
export default {
  name: "InsContainer",
  components: { Container }
};
</script>
