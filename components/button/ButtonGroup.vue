<template>
  <ButtonGroup class="ins-button-group">
    <slot/>
  </ButtonGroup>
</template>

<script>
import { ButtonGroup } from "element-ui";

export default {
  name: "InsButtonGroup",
  components: { ButtonGroup }
};
</script>
