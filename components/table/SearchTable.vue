<template>
  <DataTable class="ins-search-table" ref="main" v-bind="$attrs" v-on="events">
    <Header
      v-if="showButtonHeader"
      slot="header"
      :searchValue="searchValue"
      :selectValue="selectValue"
      :search="search"
      :buttons="localButtons"
      @change="onSearchChange"
      @select="onSelectChange"
      @search="onSearchValueChange"
    >
      <slot name="buttons"/>
    </Header>
    <slot/>
    <slot name="empty" slot="empty"/>
    <slot name="append" slot="append"/>
    <slot name="footer" slot="footer"/>
  </DataTable>
</template>

<script>
import { isNilEmpty } from "@insgeek/util";
import { refs } from "utils/mixins";
import tableActions from "./mixin";
import DataTable from "./DataTable.vue";
import Header from "./SearchTableHeader.vue";

export default {
  name: "InsSearchTable",
  components: { DataTable, Header },
  mixins: [refs, tableActions],
  props: {
    search: { type: Array, default: () => [] },
    buttons: { type: Array, default: () => [] }
  },
  data() {
    return {
      searchValue: "",
      selectValue: "",
      cache: {},
      events: {
        ...this.$listeners,
        change: this.onTableChange
      }
    };
  },
  computed: {
    showButtonHeader() {
      return this.search.length > 0 || this.buttons.length > 0 || !isNilEmpty(this.$slots.buttons);
    },
    localButtons() {
      return this.buttons.map(button => {
        return {
          ...button,
          emit: () => {
            if (button.emit in this.$listeners) {
              this.$listeners[button.emit](button);
            } else {
              this.$emit("header", button.emit, button);
            }
          }
        };
      });
    },
    firstValue() {
      const first = this.search[0] || {};
      return first.value || "";
    }
  },
  watch: {
    firstValue: {
      handler: function(next) {
        if (!this.selectValue) this.selectValue = next;
      },
      immediate: true
    }
  },
  methods: {
    makeParams() {
      return isNilEmpty(this.searchValue)
        ? {}
        : { [this.selectValue]: this.searchValue };
    },
    onSearchChange(value) {
      this.searchValue = value;
    },
    onSelectChange(value) {
      Object.assign(this.cache, this.makeParams());
      this.selectValue = value;
      this.searchValue = this.cache[value];
    },
    onTableChange(params, action) {
      const localParams = isNilEmpty(this.searchValue)
        ? {}
        : { [this.selectValue]: this.searchValue };
      this.change(Object.assign(params, localParams), action);
    },
    onSearchValueChange() {
      const ref = this.$refs.main;
      const tableParams = ref ? ref.makeParams() : {};
      this.change(Object.assign({}, tableParams, this.makeParams()), "search");
    },
    change(params, action) {
      this.$emit("change", params, action);
    }
  }
};
</script>
