<template>
  <!-- The Modal -->
  <div class="modal fade" :id="divID">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header justify-content-between align-items-center">
          <h4 class="modal-title">{{ title }}</h4>
          <button type="button" class="close" v-on:click="closeModal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <slot name="popup-body"> popup body body </slot>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <slot name="popup-footer">
            <button
              type="button"
              class="btn btn-secondary"
              v-on:click="closeModal"
            >
              Đóng
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  methods: {
    closeModal() {
      try {
        $("#" + this.divID).modal("hide");
        this.$emit("closeModal");
      } catch (e) {
        console.log(e);
      }
    },
  },
  data: function () {
    return {};
  },
  props: {
    divID: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "Tiêu đề",
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.modal-content {
  text-align: left;
}
</style>
