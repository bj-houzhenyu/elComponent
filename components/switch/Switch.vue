<template>
  <ElSwitch ref="main" class="ins-switch" v-bind="$attrs" v-on="$listeners"/>
</template>

<script>
import { Switch as ElSwitch } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsSwitch",
  components: { ElSwitch },
  mixins: [refs]
};
</script>
