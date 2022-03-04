<template>
  <Row class="ins-row" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </Row>
</template>

<script>
import { Row } from "element-ui";
export default {
  name: "InsRow",
  components: { Row }
};
</script>
