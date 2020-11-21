<template>
  <div id="part6-instruction">
    <p class="title"><b>Part VI: Text Completion</b></p>
    <p>
      <b>Directions:</b> Read the texts that follow. A word or pharse is missing in some of the sentences. Four answer choices are given below each of the sentences. Select the best answer to complete the text. Then mark the letter (A), (B), (C) or (D) on your answer sheet.
    </p>
    <button v-on:click="start" class="btn h-btn-primary">Bắt đầu</button>
  </div>
</template>
<script>
import titleResource from "@/assets/resources/title.js";
export default {
  data() {
    return {};
  },
  created() {
    // Đặt lại tiêu đề header
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART6_TITLE);
  },
  methods: {
    start() {
      try {
        var examID = JSON.parse(localStorage.getItem("selected-exam"))?.ExamID;
        this.$router.push(`/toeicexam/${examID}/part6-detail`);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
