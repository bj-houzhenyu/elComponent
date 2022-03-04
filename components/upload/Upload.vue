<template>
  <Upload ref="main" class="ins-upload" v-bind="$attrs" v-on="$listeners">
    <slot slot="trigger"/>
    <slot name="tip" slot="tip"/>
  </Upload>
</template>

<script>
import { Upload } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsUpload",
  components: { Upload },
  mixins: [refs]
};
</script>
