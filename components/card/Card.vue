<template>
  <div :class="cardClass">
    <div :class="headerClass" v-show="!hideHeader" @click="onCollapse">
      <div class="ins-card__header-title" v-show="!hideTitle">
        <Icon v-if="prefix !== false" name="prefix"/>
        <slot name="title" :title="title">{{title}}</slot>
      </div>
      <div class="ins-card__header-extra" v-show="!hideExtra">
        <slot name="title-bar"/>
      </div>
    </div>
    <CollapseTransition>
      <div class="ins-card__content" v-show="!hideContent">
        <slot/>
      </div>
    </CollapseTransition>
  </div>
</template>

<script>
import { CollapseTransition } from "element-ui";
import { isNilEmpty } from "@insgeek/util";
import { Sizes } from "utils";
import Icon from "../icon/Icon.vue";

export default {
  name: "InsCard",
  components: { CollapseTransition, Icon },
  props: {
    prefix: { type: [Boolean, String, Object], defualt: true },
    title: { type: String, default: undefined },
    size: { type: String, default: "small" },
    full: { type: Boolean, default: false },
    collapse: { type: Boolean, default: null },
    border: { type: Boolean, default: false },
    icon: { type: Boolean, default: true }
  },
  computed: {
    cardClass() {
      const border = this.border === true;
      return ["ins-card", {
        "ins-card-icon": !border && this.icon === true,
        "ins-card-full": this.full === true,
        [`ins-card--${this.size}`]: Sizes.includes(this.size),
        "ins-card-border": border
      }];
    },
    showPrefix() {
      return typeof this.prefix === "boolean";
    },
    prefixIcon() {
      return !this.showPrefix;
    },
    showCollapse() {
      return this.collapse !== null;
    },
    headerClass() {
      return {
        "ins-card__header": true,
        "ins-card__header-collapse": this.showCollapse,
        "ins-card__header-border": this.border === true
      };
    },
    hideTitle() {
      return isNilEmpty(this.title) && isNilEmpty(this.$slots.title);
    },
    hideExtra() {
      return isNilEmpty(this.$slots["title-bar"]);
    },
    hideHeader() {
      return this.hideTitle && this.hideExtra;
    },
    hideContent() {
      return this.collapse === true;
    }
  },
  methods: {
    onCollapse() {
      this.$emit("collapse", this.collapse);
    }
  }
};
</script>
