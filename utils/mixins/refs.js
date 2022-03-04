export default {
  inheritAttrs: false,
  emit: ["update:forwardRef"],
  mounted() {
    if (this.$refs.main) {
      this.$emit("update:forwardRef", this.$refs.main);
    }
  }
};
