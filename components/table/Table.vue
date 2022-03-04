<template>
  <Table ref="main" :height="localHeight" :class="tableClass" v-bind="$attrs" v-on="$listeners">
    <slot/>
    <TableColumn v-if="showCheckBox" type="selection" :width="localSelectionWidth"/>
    <template v-for="(column, index) in columns">
      <TableColumn :key="filterKey(column.filter, index)" v-bind="column" @column="onColumnChange">
        <HeaderFilter
          v-if="showFilter(column)"
          slot="header"
          :filter="filter"
          :column="column"
          v-bind="column.filter"
          @change="onFilter"
        />
      </TableColumn>
    </template>
    <component v-if="emptyComponent" :is="this.empty" slot="empty"/>
    <slot v-else name="empty" slot="empty">{{empty}}</slot>
    <slot name="append" slot="append"/>
  </Table>
</template>

<script>
import { Table } from "element-ui";
import { isNilEmpty, isArray, copy, throttle } from "@insgeek/util";
import { Sizes } from "utils";
import { refs } from "utils/mixins";
import tableActions from "./mixin";
import TableColumn from "./TableColumn.vue";
import HeaderFilter from "./TableColumnFilter.vue";

export default {
  name: "InsTable",
  components: { Table, TableColumn, HeaderFilter },
  mixins: [refs, tableActions],
  props: {
    columns: { type: Array, default: () => [] },
    empty: { type: [Object, String], default: "暂无数据" },
    full: { type: Boolean, default: false },
    size: { type: String, default: "small" },
    height: { type: [String, Number], default: undefined },
    selection: { type: [Boolean, String], default: "" },
    selectionWidth: { type: [String, Number], default: "" }
  },
  data() {
    return {
      filter: {}
    };
  },
  watch: {
    columns: {
      handler: function() {
        this.forceUpdate();
      },
      deep: true
    }
  },
  computed: {
    tableClass() {
      return {
        "ins-table": true,
        "ins-table-full": this.full === true,
        [`ins-table--${this.size}`]: Sizes.includes(this.size)
      };
    },
    localHeight() {
      if (this.full && isNilEmpty(this.height)) return "100%";
      else return this.height;
    },
    emptyComponent() {
      return typeof this.empty === "object";
    },
    showCheckBox() {
      return this.selection === true || this.selection === "checkbox";
    },
    showRadio() {
      return this.selection === "radio";
    },
    localSelectionWidth() {
      return this.selection.toString();
    }
  },
  unmounted() {
    this.forceUpdate.clear();
  },
  methods: {
    forceUpdate: throttle(function() {
      this.$forceUpdate();
    }, 100),
    onColumnChange(action, ...args) {
      if (action in this.$listeners) {
        this.$listeners[action](...args);
      } else {
        this.$emit("column", action, ...args);
      }
    },
    showFilter(column) {
      const { filter } = column;
      const { type, sort } = filter || {};
      return type || sort;
    },
    filterKey(filter, index) {
      const { props: { options = [] } = {} } = filter || {};
      return `${JSON.stringify(options)}_${index}`;
    },
    setFilter(params) {
      // this.$set(this, "filter", Object.assign({}, this.filter, params))
      Object.entries(params).forEach(([key, value]) => {
        const bo = isNilEmpty(value) || (isArray(value) && value.length < 1);
        if (bo) this.$delete(this.filter, key);
        else this.$set(this.filter, key, value);
      });
    },
    copyFilter() {
      const results = Object.entries(this.filter).filter(([, value]) => {
        return !isNilEmpty(value);
      }).map(([key, value]) => {
        return { [key]: copy(value) };
      });
      return results.length > 0 ? Object.assign(...results) : {};
    },
    onFilter(params) {
      this.setFilter(params);
      this.$emit("change", this.copyFilter(this.filter), "column_search");
    }
  }
};
</script>
