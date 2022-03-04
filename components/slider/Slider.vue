<template>
  <Slider ref="main" class="ins-slider" v-bind="$attrs" v-on="$listeners"/>
</template>

<script>
import { Slider } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsSlider",
  components: { Slider },
  mixins: [refs]
};
</script>
