<template>
  <div :class="dataTableClass">
    <slot name="header"/>
    <Table ref="main" :size="size" :full="full" v-bind="$attrs" v-on="events">
      <slot/>
      <slot name="empty" slot="empty"/>
      <slot name="append" slot="append"/>
    </Table>
    <footer class="ins-data-table-footer" v-if="showFooter">
      <div class="ins-table-footer-btns">
        <slot name="footer"/>
      </div>
      <Pager
        ref="pager"
        v-if="showPager"
        v-bind="page"
        @size-change="onChangeSize"
        @current-change="onChangePage"
      />
    </footer>
  </div>
</template>

<script>
import { isNilEmpty, parseNumber } from "@insgeek/util";
import { Sizes } from "utils";
import { refs } from "utils/mixins";
import tableActions from "./mixin";
import Table from "./Table.vue";
import Pager from "./Pager.vue";

const defaultPage = {
  page_num: 1,
  page_size: 20,
  total: 0
};

export default {
  name: "InsDataTable",
  components: { Table, Pager },
  mixins: [refs, tableActions],
  props: {
    size: { type: String, default: "medium" },
    full: { type: Boolean, default: false },
    page: { type: [Object, Boolean], default: () => Object.assign({}, defaultPage) }
  },
  data() {
    return {
      cache: {},
      nextPageSize: undefined,
      events: {
        ...this.$listeners,
        change: this.onTableChange
      }
    };
  },
  computed: {
    dataTableClass() {
      return {
        "ins-data-table": true,
        "ins-data-table-full": this.full === true,
        [`ins-data-table--${this.size}`]: Sizes.includes(this.size)
      };
    },
    showPager() {
      return this.page !== false;
    },
    showFooter() {
      return !isNilEmpty(this.$slots.footer) || this.showPager;
    }
  },
  methods: {
    makeNextPageSize(next) {
      const num = parseNumber(this.page.page_num);
      const total = parseNumber(this.page.total);
      const size = parseNumber(next);
      const pageCount = Math.ceil(total / size);
      if (num > pageCount) {
        this.nextPageSize = next;
        return true;
      } else return false;
    },
    makePageParam() {
      const { page_num, page_size } = this.page;
      return { page_num, page_size };
    },
    makeParams(params) {
      return Object.assign(this.cache, this.makePageParam(), params);
    },
    onChangeSize(page_size) {
      if (this.makeNextPageSize(page_size)) return;
      this.change(this.makeParams({ page_size }), "page_size");
    },
    onChangePage(page_num) {
      const params = { page_num };
      if (!isNilEmpty(this.nextPageSize)) {
        Object.assign(params, { page_size: this.nextPageSize });
        this.nextPageSize = undefined;
      }
      this.change(this.makeParams(params), "page_num");
    },
    onTableChange(params, type) {
      this.cache = params;
      this.change(this.makeParams(), type);
    },
    change(params, type) {
      this.$emit("change", params, type);
    }
  }
};
</script>
