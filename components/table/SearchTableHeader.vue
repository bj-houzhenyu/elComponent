<template>
  <header class="ins-search-table-header">
    <div class="ins-search-table-search" v-if="showSearch">
      <Input placeholder="请输入" :value="searchValue" @input="onChange" clearable>
        <Select popper-class="ins-search-dropdown-poper" :value="selectValue" :options="search" @change="onSelect" slot="prepend"/>
      </Input>
      <Button class="ins-search-table-search-button" @click="onSearch">搜索</Button>
    </div>
    <div class="ins-search-table-button">
      <slot/>
      <GroupButton :buttons="buttons"/>
    </div>
  </header>
</template>

<script>
import Button from "../button/Button.vue";
import GroupButton from "../groupButton/GroupButton.vue";
import Input from "../input/Input.vue";
import Select from "../select/Select.vue";

export default {
  components: { Button, GroupButton, Input, Select },
  props: {
    searchValue: { type: String, default: "" },
    selectValue: { type: String, default: "" },
    search: { type: Array, default: () => [] },
    buttons: { type: Array, default: () => [] }
  },
  computed: {
    showSearch() {
      return this.search.length > 0;
    }
  },
  methods: {
    onChange(...args) {
      this.$emit("change", ...args);
    },
    onSelect(...args) {
      this.$emit("select", ...args);
    },
    onSearch(...args) {
      this.$emit("search", ...args);
    }
  }
};
</script>
