<template>
  <Popover
    ref="main"
    class="ins-line-label-popover"
    v-model="display"
    popper-class="ins-line-label-popover-popper"
    :disabled="disablePopover"
    @hide="onBlur"
    placement="top"
  >
    <slot/>
    <LineLabel line slot="reference" v-bind="$attrs">
      <Translate :class="translateClass" :value="value" :options="options" :none="none">
        <template v-slot="props">
          {{showPlaceholder ? placeholder : props.label}}
          {{props.last ? "" : ","}}
        </template>
      </Translate>
    </LineLabel>
  </Popover>
</template>

<script>
import { isNilEmpty } from "@insgeek/util";
import { refs } from "utils/mixins";
import LineLabel from "./Label.vue";
import Popover from "../popover/Popover.vue";
import Translate from "../translate/Translate.vue";

export default {
  name: "InsLineLablePopover",
  components: { LineLabel, Popover, Translate },
  mixins: [refs],
  props: {
    value: { type: [Array, String, Number], default: "" },
    options: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    none: { type: String, default: "" }
  },
  data() {
    return {
      display: false
    };
  },
  computed: {
    showPlaceholder() {
      if (isNilEmpty(this.value)) return true;
      if (Array.isArray(this.value) && this.value.length < 1) return true;
      return false;
    },
    translateClass() {
      return {
        "ins-line-label-popover-placeholder": this.showPlaceholder,
        "ins-line-label-popover-disabled": this.disabled,
        "ins-line-label-popover-readonly": this.readonly
      };
    },
    disablePopover() {
      return this.disabled || this.readonly;
    }
  },
  methods: {
    onBlur() {
      this.$emit("blur");
    },
    close() {
      this.display = false;
    }
  }
};
</script>
