<template>
  <Input ref="main" class="ins-input" :size="size" :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">
    <slot name="prefix" slot="prefix"/>
    <slot name="suffix" slot="suffix"/>
    <slot name="prepend" slot="prepend"/>
    <slot name="append" slot="append"/>
    <template slot="suffix" v-if="unit">{{unit}}</template>
  </Input>
</template>

<script>
import { Input } from "element-ui";
import { refs } from "utils/mixins";

export default {
  name: "InsInput",
  components: { Input },
  mixins: [refs],
  props: {
    size: { type: String, default: "small" },
    placeholder: { type: String, default: "请输入" },
    unit: { type: String, default: "" }
  }
};
</script>
