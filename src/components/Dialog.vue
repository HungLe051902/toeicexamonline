<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Cancel</el-button>
      <el-button type="primary" @click="handleClose"
        >Confirm</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  watch: {},
  props: {
    title: {
      type: String,
      default: "Tiêu đề",
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // Xử lý trước khi đóng Dialog
    handleClose() {
      try {
        this.$emit("closeDialog");
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {},
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
</style>