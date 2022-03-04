<template>
  <Pagination
    ref="main"
    class="ins-pagination"
    :background="background"
    :layout="layout"
    :current-page="localCurrentPage"
    :page-size="localPageSize"
    :total="localTotal"
    :page-sizes="pageSizes"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot/>
  </Pagination>
</template>

<script>
import { Pagination } from "element-ui";
import { isNilEmpty, parseNumber } from "@insgeek/util";
import { refs } from "utils/mixins";

export default {
  name: "InsPagination",
  components: { Pagination },
  mixins: [refs],
  props: {
    background: { type: Boolean, default: true },
    layout: { type: String, default: "total, sizes, prev, pager, next, jumper, ->" },
    pageSizes: { type: Array, default: () => [20, 30, 40, 50] },
    currentPage: { type: [String, Number], default: undefined },
    pageNum: { type: [String, Number], default: undefined },
    page_num: { type: [String, Number], default: undefined },
    pageSize: { type: [String, Number], default: undefined },
    page_size: { type: [String, Number], default: undefined },
    total: { type: [String, Number], default: undefined }
  },
  computed: {
    localCurrentPage() {
      let pageNum = 1;
      if (!isNilEmpty(this.page_num)) pageNum = this.page_num;
      else if (!isNilEmpty(this.pageNum)) pageNum = this.pageNum;
      else if (!isNilEmpty(this.currentPage)) pageNum = this.currentPage;
      return parseNumber(pageNum);
    },
    localPageSize() {
      let pageSize = 10;
      if (!isNilEmpty(this.page_size)) pageSize = this.page_size;
      else if (!isNilEmpty(this.pageSize)) pageSize = this.pageSize;
      return parseNumber(pageSize);
    },
    localTotal() {
      return parseNumber(this.total) || 0;
    }
  }
};
</script>
