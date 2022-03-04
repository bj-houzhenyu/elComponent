<template>
  <div :class="bindClass">
    <component v-if="showComponent" :is="localComponent" v-model="localModel" :model="model" :size="size" :prop="prop" v-bind="props" v-on="actions"/>
    <Label v-else-if="showLabel" :value="formatValue" :size="size" v-bind="props" v-on="actions"/>
    <Label v-else-if="showLineLabel" line :value="formatValue" :size="size" v-bind="props" v-on="actions"/>
    <LineInput v-else-if="showLineInput" v-model="localModel" :size="size" v-bind="props" v-on="actions"/>
    <LineTextarea v-else-if="showLineTextarea" v-model="localModel" :size="size" v-bind="props" v-on="actions"/>
    <Select v-else-if="showSelect" v-model="localModel" :size="size" v-bind="props" v-on="actions"/>
    <LineSelect v-else-if="showLineSelect" v-model="localModel" :size="size" v-bind="props" v-on="actions"/>
    <Radio v-else-if="showRadio" v-model="localModel" :size="size" v-bind="props" v-on="actions"/>
    <Checkbox v-else-if="showCheckbox" v-model="localModel" :size="size" v-bind="props" v-on="actions"/>
    <DatePicker v-else-if="showDatePicker" v-model="localModel" :type="this.type" :size="size" v-bind="props" v-on="actions"/>
    <TimePicker v-else-if="showTimePicker" v-model="localModel" :type="this.type" :size="size" v-bind="props" v-on="actions"/>
    <Cascader v-else-if="showCascader" v-model="localModel" :size="size" v-bind="props" v-on="actions"/>
    <Input v-else v-model="localModel" :type="type" :size="size" v-bind="props" v-on="actions"/>
  </div>
</template>

<script>
import { isNilEmpty, isFunction, isObject } from "@insgeek/util";
import { refs } from "utils/mixins";
import Label from "../label/Label.vue";
import Input from "../input/Input.vue";
import LineInput from "../input/LineInput.vue";
import LineTextarea from "../input/LineTextarea.vue";
import Select from "../select/Select.vue";
import LineSelect from "../select/LineSelect.vue";
import Radio from "../radio/RadioGroup.vue";
import Checkbox from "../checkbox/CheckboxGroup.vue";
import DatePicker from "../datePicker/DatePicker.vue";
import TimePicker from "../datePicker/TimePicker.vue";
import Cascader from "../cascader/Cascader.vue";

const inputTypes = ["text", "input", "textarea", "hidden"];
const lineInputTypes = ["lineInput"];
const lineTextareaTypes = ["lineTextarea"];
const selectTypes = ["select"];
const lineSelectTypes = ["lineSelect"];
const labelTypes = ["label"];
const lineLabelTypes = ["lineLabel"];
const checkboxTypes = ["checkbox"];
const radioTypes = ["radio"];
const datepickerTypes = "year,month,date,week,datetime,datetimerange,daterange".split(",");
const timepickerTypes = ["time"];
const cascaderTypes = ["cascader"];

export default {
  name: "InsFormBaseInput",
  mixins: [refs],
  components: { Label, Input, LineInput, LineTextarea, Select, LineSelect, Radio, Checkbox, DatePicker, TimePicker, Cascader },
  props: {
    type: { type: [Object, String], default: "input" },
    value: { type: [String, Number, Boolean, Array, Object, Date], default: "" },
    format: { type: [Object, Function], default: undefined },
    model: { type: Object, default: undefined },
    disabled: { type: Boolean, default: false },
    props: { type: Object, default: () => ({}) },
    prop: { type: String, default: undefined },
    size: { type: String, default: "small" },
    none: { type: String, default: "-" },
    isError: { type: Boolean, default: false },
    isPending: { type: Boolean, default: false }
  },
  data() {
    const actions = "blur,change".split(",").reduce((event, key) => {
      event[key] = (...args) => this.trigger(key, args);
      return event;
    }, {});
    return { actions };
  },
  computed: {
    bindClass() {
      return {
        "ins-form-base-input": true,
        "is-error": this.isError === true,
        "is-pending": this.isPending === true
      };
    },
    localModel: {
      get() { return isNilEmpty(this.value) ? undefined : this.value; },
      set(value) { this.trigger("input", [value]); }
    },
    formatValue() {
      const formatValue = isFunction(this.format)
        ? this.format(this.localModel, this.model)
        : this.localModel;
      return isNilEmpty(formatValue) ? this.none : formatValue;
    },
    showLabel() {
      return labelTypes.includes(this.type);
    },
    showLineLabel() {
      return lineLabelTypes.includes(this.type);
    },
    showComponent() {
      return this.showLabel ? isObject(this.format) : isObject(this.type);
    },
    localComponent() {
      return this.showLabel ? this.format : this.type;
    },
    showInput() {
      return !this.type || inputTypes.includes(this.type);
    },
    showLineInput() {
      return lineInputTypes.includes(this.type);
    },
    showLineTextarea() {
      return lineTextareaTypes.includes(this.type);
    },
    showSelect() {
      return selectTypes.includes(this.type);
    },
    showLineSelect() {
      return lineSelectTypes.includes(this.type);
    },
    showRadio() {
      return radioTypes.includes(this.type);
    },
    showCheckbox() {
      return checkboxTypes.includes(this.type);
    },
    showDatePicker() {
      return datepickerTypes.includes(this.type);
    },
    showTimePicker() {
      return timepickerTypes.includes(this.type);
    },
    showCascader() {
      return cascaderTypes.includes(this.type);
    }
  },
  methods: {
    trigger(action, args) {
      if (action in this.$attrs && isFunction(this.$attrs[action])) {
        this.$attrs[action](...args);
      } else if (action in this.$listeners && isFunction(this.$listeners[action])) {
        this.$listeners[action](...args);
      } else this.$emit(action, ...args);
    }
  }
};
</script>
