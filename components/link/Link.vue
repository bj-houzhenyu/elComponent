<template>
  <Link ref="main" class="ins-link" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </Link>
</template>

<script>
import { Link } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsLink",
  components: { Link },
  mixins: [refs]
};
</script>
