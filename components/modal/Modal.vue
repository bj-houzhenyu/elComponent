<template>
  <Dialog ref="main" :class="bindClass" :width="localWidth" v-bind="$attrs" v-on="$listeners">
    <div class="ins-modal-wrapper" :style="bindWrapperStyle"><slot/></div>
    <slot name="title" slot="title"/>
    <slot name="footer" slot="footer"/>
  </Dialog>
</template>

<script>
import { Dialog } from "element-ui";
import { isNilEmpty, isNumber, isString } from "@insgeek/util";
import { refs } from "utils/mixins";

export default {
  name: "InsModal",
  components: { Dialog },
  mixins: [refs],
  props: {
    width: { type: [String, Number], default: undefined },
    height: { type: [String, Number], default: undefined }
  },
  computed: {
    showHeight() {
      return !isNilEmpty(this.height);
    },
    bindClass() {
      return ["ins-modal", {
        "ins-flex-modal": this.showHeight,
        [`ins-modal--height-${this.height}-p`]: this.showHeight && isNumber(this.height)
      }];
    },
    bindWrapperStyle() {
      if (this.showHeight && isString(this.height)) {
        return { height: this.height };
      } else return {};
    },
    localWidth() {
      return isNumber(this.width) ? `${this.width}%` : this.width;
    }
  }
};
</script>
