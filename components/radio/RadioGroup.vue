<template>
  <RadioGroup ref="main" :size="size" :class="bindClass" v-bind="$attrs" v-on="$listeners">
    <slot/>
    <template v-for="(option, index) in options">
      <RadioButton v-if="showButton(option.type)" :key="index" v-bind="option"/>
      <Radio v-else :key="index" v-bind="option" :label="option.value">{{option.label}}</Radio>
    </template>
  </RadioGroup>
</template>

<script>
import { RadioGroup } from "element-ui";
import { refs } from "utils/mixins";
import { Sizes } from "utils";
import Radio from "./Radio.vue";
import RadioButton from "./RadioButton.vue";

export default {
  name: "InsRadioGroup",
  components: { RadioGroup, Radio, RadioButton },
  mixins: [refs],
  props: {
    size: { type: String, default: "small" },
    options: { type: Array, default: () => [] },
    vertical: { type: Boolean, default: false }
  },
  computed: {
    bindClass() {
      return {
        "ins-radio-group": true,
        "ins-radio-group-vertical": this.vertical,
        [`ins-radio-group--${this.size}`]: Sizes.includes(this.size)
      };
    }
  },
  methods: {
    showButton(type) {
      return type === "button";
    }
  }
};
</script>
