<template>
  <Col class="ins-col" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </Col>
</template>

<script>
import { Col } from "element-ui";
export default {
  name: "InsCol",
  components: { Col }
};
</script>
