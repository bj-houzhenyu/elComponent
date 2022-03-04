<template>
  <div class="ins-line-textarea">
    <LineLable line v-if="showLabel" :value="model" :size="size" :disabled="disabled" :readonly="readonly" @click="clickLabel"/>
    <Input v-else ref="area" type="textarea" v-model="model" :size="size" :disabled="disabled" :readonly="readonly" v-bind="$attrs" v-on="$listeners" @blur="blurTextarea"/>
  </div>
</template>

<script>
import LineLable from "../label/Label.vue";
import Input from "./Input.vue";

export default {
  name: "InsLineTextarea",
  components: { LineLable, Input },
  props: {
    value: { type: String, default: "" },
    size: { type: String, default: "small" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false }
  },
  data() {
    return {
      showLabel: true
    };
  },
  computed: {
    model: {
      get() { return this.value; },
      set(value) { this.$emit("input", value); }
    },
    localDisabled() {
      return this.disabled || this.readonly;
    }
  },
  methods: {
    clickLabel() {
      if (this.localDisabled) return;
      this.showLabel = false;
      this.$nextTick(() => {
        if (this.$refs.area && this.$refs.area.$refs.main) {
          this.$refs.area.$refs.main.focus();
        }
      });
    },
    blurTextarea() {
      this.showLabel = true;
    }
  }
};
</script>
