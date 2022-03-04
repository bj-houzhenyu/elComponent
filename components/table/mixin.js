const actionNames = [
  "clearSelection",
  "toggleRowSelection",
  "toggleAllSelection",
  "toggleRowExpansion",
  "setCurrentRow",
  "clearSort",
  "clearFilter",
  "doLayout",
  "sort"
];

export default {
  data() {
    const actions = {};
    actionNames.forEach(name => {
      actions[name] = (...args) => {
        if (this.$refs.main && this.$refs.main[name]) {
          this.$refs.main[name](...args);
        }
      };
    });
    return { ...actions };
  }
};
