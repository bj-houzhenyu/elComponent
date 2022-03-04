<template>
  <Form ref="main" :model="localModel" :label-position="localPosition" :class="bindClass" :rules="localRules" v-bind="$attrs" v-on="$listeners">
    <slot/>
    <template v-for="(option, index) in localOptions">
      <input v-if="hidden(option)" :key="index" type="hidden" :name="option.prop" :value="localModel[option.prop]">
      <FormItem v-else :key="index" v-bind="option" :size="size">
        <BaseInputGroup
          v-if="showBaseGroup(option.type)"
          :value="localModel[option.prop]"
          :size="size"
          :model="model"
          v-bind="option"
          @input="onInput(option.prop, $event)"
        />
        <BaseInput
          v-else
          v-bind="option"
          :size="size"
          :value="localModel[option.prop]"
          :model="model"
          :type="buildType(option.type)"
          :slot="option.slot"
          :props="option.props"
          @input="onInput(option.prop, $event)"
        />
      </FormItem>
    </template>
    <slot name="footer"/>
  </Form>
</template>

<script>
import { Form } from "element-ui";
import { copy } from "@insgeek/util";
import { refs } from "utils/mixins";
import FormItem from "./FormItem.vue";
import BaseInput from "./BaseInput.vue";
import BaseInputGroup from "./BaseInputGroup.vue";

function initModel(options, model) {
  return options.length > 0 ? Object.assign(...options.map(option => {
    return { [option.prop]: model[option.prop] };
  })) : copy(model);
}

export default {
  name: "InsForm",
  components: { Form, FormItem, BaseInput, BaseInputGroup },
  mixins: [refs],
  props: {
    model: { type: Object, default: () => ({}) },
    rules: { type: Object, default: () => ({}) },
    options: { type: Array, default: () => [] },
    labelPosition: { type: String, default: "" },
    size: { type: String, default: "small" },
    grid: { type: Number, default: 1 },
    type: { type: String, default: "form" }
  },
  data() {
    return {
      localModel: initModel(this.options, this.model)
    };
  },
  watch: {
    type() {
      this.clearValidate(this.localRulesKey);
    },
    options: {
      handler(next) {
        this.localModel = initModel(next, this.localModel);
      },
      deep: true
    },
    model: {
      handler(next) {
        this.localModel = initModel(this.options, next);
      },
      deep: true
    }
  },
  computed: {
    isInfo() {
      return this.type === "info";
    },
    isForm() {
      return this.type === "form";
    },
    localPosition() {
      if (this.labelPosition) return this.labelPosition;
      if (this.isForm) return "top";
      else return "left";
    },
    bindClass() {
      return {
        "ins-form": true,
        [`ins-form--grid-${this.grid}`]: this.grid > 0,
        "ins-form-label": !this.isForm,
        "ins-form-info": this.isInfo,
        "ins-form-horizen": this.localPosition !== "top"
      };
    },
    localRules() {
      return this.type === "form" ? this.rules : {};
    },
    localRulesKey() {
      return Object.keys(this.rules);
    },
    localOptions() {
      return this.options.filter(option => option.visible !== false);
    }
  },
  methods: {
    hidden(option) {
      return option.type === "hidden";
    },
    showBaseGroup(type) {
      return this.isForm && type === "group";
    },
    validate() {
      return new Promise((resolve, reject) => {
        if (!this.$refs.main) reject("form ref not found");
        this.$refs.main.validate(res => {
          if (!res) reject();
          return resolve(copy(this.localModel));
        });
      });
    },
    buildType(type) {
      return this.isForm ? type : "label";
    },
    resetFields(...args) {
      return this.$refs.main.resetFields(...args);
    },
    clearValidate(...args) {
      return this.$refs.main.clearValidate(...args);
    },
    onInput(prop, value) {
      const result = { [prop]: value };
      Object.assign(this.localModel, result);
      this.$emit("input", Object.assign(this.model, result));
    }
  }
};
</script>
