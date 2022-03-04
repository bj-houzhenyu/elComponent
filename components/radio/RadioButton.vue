<template>
  <RadioButton ref="main" class="ins-radio-button" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </RadioButton>
</template>

<script>
import { RadioButton } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsRadioButton",
  components: { RadioButton },
  mixins: [refs]
};
</script>
