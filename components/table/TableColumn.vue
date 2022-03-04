<template>
  <TableColumn class="ins-table-column" :type="type" v-bind="$attrs" v-on="$listeners">
    <slot name="header" slot="header"/>
    <template v-slot="props" v-if="!showType">
      <component v-if="isComponent" :forwordRef="forwordRef" :is="format" v-bind="buildProps(props)" @column="onColumn"/>
      <slot :column="props.column" :row="props.row" :$index="props.$index">
        <template v-if="!isComponent">
          <Checkbox v-if="showSelection"/>
          <div class="ins-table-column-content" v-else :title="formatColumnValue(props)">{{formatColumnValue(props)}}<div>
        </template>
      </slot>
      <GroupButton v-if="showButtons" :buttons="rebuildButtons(props)"/>
    </template>
  </TableColumn>
</template>

<script>
import { TableColumn } from "element-ui";
import { isObject, isFunction, isNilEmpty } from "@insgeek/util";
import Checkbox from "../checkbox/Checkbox.vue";
import GroupButton from "../groupButton/GroupButton.vue";

export default {
  name: "InsTableColumn",
  components: { TableColumn, Checkbox, GroupButton },
  props: {
    type: { type: String, default: undefined },
    buttons: { type: Array, default: () => [] },
    format: { type: [Object, Function], default: undefined },
    dict: { type: Array, default: () => [] },
    none: { type: String, default: "-" },
    forwordRef: { type: [Object, Function], default: undefined },
    props: { type: Object, default: () => ({}) }
  },
  computed: {
    showButtons() {
      return this.buttons.length > 0;
    },
    isComponent() {
      return isObject(this.format);
    },
    showType() {
      return !isNilEmpty(this.type);
    }
  },
  methods: {
    getValue(props) {
      const { row, column } = props;
      return row && column ? row[column.property] : undefined;
    },
    formatColumnValue(props) {
      const { row, column } = props;
      const origin = this.getValue(props);
      const formatValue = isFunction(this.format)
        ? this.format(origin, row, column)
        : origin;
      return isNilEmpty(formatValue)
        ? (this.showButtons ? "" : this.none)
        : formatValue;
    },
    buildProps(props) {
      const { $index, column, ...others } = props;
      return {
        index: $index,
        value: this.getValue(props),
        options: this.dict,
        prop: column ? column.property : "",
        column,
        ...this.props,
        ...others
      };
    },
    onColumn(action, ...args) {
      this.$emit("column", action, ...args);
    },
    rebuildButtons(props) {
      return this.buttons.map(button => {
        const { title, emit, ...others } = button;
        const bo = isFunction(title);
        return {
          ...others,
          title: bo ? title(props) : title,
          emit: () => {
            this.$emit("column", emit, { button, ...props });
          }
        };
      });
    }
  }
};
</script>
