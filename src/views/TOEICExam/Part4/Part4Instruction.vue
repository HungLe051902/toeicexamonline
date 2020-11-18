<template>
  <div id="part4-instruction">
    <p class="title"><b>Part IV: Short Talks</b></p>
    <p>
      <b>Directions:</b> You will hear some talks given by a single speaker. You will be asked to answer three questions about what the speaker says in each talk. Select the best response to each question and mark the letter (A), (B), (C) or (D) on your answer sheet. The talks will not be printed in your test book and will be spoken only one time.
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
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART4_TITLE);
  },
  methods: {
    start() {
      try {
        var examID = JSON.parse(localStorage.getItem("selected-exam"))?.ExamID;
        this.$router.push(`/toeicexam/${examID}/part4-detail`);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
