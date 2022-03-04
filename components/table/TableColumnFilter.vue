<template>
  <div :class="bindClass">
    <div class="ins-table-title-bar">{{label}}</div>
    <div v-if="sort" class="sort-wrapper">
      <i :class="ascClass" @click="fnOrder('asc')" />
      <i :class="descClass" @click="fnOrder('desc')" />
    </div>
    <Popover v-if="type" v-model="visible" popper-class="ins-table-filter-poper">
      <div class="ins-table-filter-wrapper">
        <BaseInput :type="type" :props="baseInputProps" v-model="value"/>
      </div>
      <Divider/>
      <footer>
        <Button type="text" @click="onChange">筛选</Button>
        <Button type="text-info" @click="onReset">重置</Button>
      </footer>
      <i class="ins-table-filter-icon el-icon-arrow-down" slot="reference"/>
    </Popover>
  </div>
</template>

<script>
import { isNilEmpty } from "@insgeek/util";
import Popover from "../popover/Popover.vue";
import BaseInput from "../form/BaseInput.vue";
import Button from "../button/Button.vue";
import Divider from "../divider/Divider.vue";

export default {
  name: "InsTableColumnFilter",
  components: { Popover, BaseInput, Button, Divider },
  props: {
    prop: { type: String, default: undefined },
    type: { type: [String, Object], default: undefined },
    column: { type: Object, default: undefined },
    sort: { type: Boolean, default: false },
    filter: { type: Object, default: () => ({}) },
    props: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      value: undefined,
      visible: false
    };
  },
  computed: {
    columnProp() {
      return this.column.prop;
    },
    localProp() {
      return this.prop || this.columnProp;
    },
    label() {
      return this.column.label;
    },
    sorting() {
      return this.columnProp === this.filter.order;
    },
    ascClass() {
      const { order, sort } = this.filter;
      return ["sort-caret", "ascending", {
        "sort-is-active": order === this.columnProp && sort === "asc"
      }];
    },
    descClass() {
      const { order, sort } = this.filter;
      return ["sort-caret", "descending", {
        "sort-is-active": order === this.columnProp && sort === "desc"
      }];
    },
    baseInputProps() {
      return {
        ...this.props,
        vertical: true,
        clearable: true
      };
    },
    bindClass() {
      const value = this.filter[this.localProp];
      return ["ins-table-column-filter", {
        "ins-table-column-filter-is-active": !isNilEmpty(value)
      }];
    }
  },
  methods: {
    fnOrder(sort) {
      if (this.sorting && sort === this.filter.sort) {
        this.trigger({ order: undefined, sort: undefined });
      } else {
        this.trigger({ order: this.columnProp, sort });
      }
    },
    onReset() {
      this.value = undefined;
      if (!isNilEmpty(this.filter[this.localProp])) {
        this.onChange();
      }
      this.visible = false;
    },
    onChange() {
      this.trigger({ [this.localProp]: this.value });
      this.visible = false;
    },
    trigger(value) {
      this.$emit("change", value);
    }
  }
};
</script>
