<template>
  <CheckboxButton ref="main" class="ins-checkbox-button" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </CheckboxButton>
</template>

<script>
import { CheckboxButton } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsCheckboxButton",
  components: { CheckboxButton },
  mixins: [refs]
};
</script>
