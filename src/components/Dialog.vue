<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="widthDialog"
    :before-close="handleClose"
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <slot name="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleClose">Confirm</el-button>
      </slot>
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
    widthDialog: {
      type: String,
      default: "450px",
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
::v-deep {
  .el-dialog__body {
    text-align: left;
    padding: 20px;
  }
  .el-dialog__header {
    padding: 20px;
    justify-content: space-between;
    display: flex;
    border-bottom: 1px solid rgb(209, 183, 183);
    font-size: 16px;
    font-weight: bold;
  }
  .el-dialog__footer {
    height: 60px;
    background-color: rgb(247, 241, 241);
  }
}
</style>