<template>
  <div id="part5-instruction">
    <p class="title"><b>Part V: Incomplete Sentences</b></p>
    <p>
      <b>Directions:</b> A word or pharse is missing in each of the sentences
      below. Four answer choices are given below each sentence. Select the best
      answer to complete the sentence. Then mark the letter (A), (B), (C) or (D)
      on your answer sheet.
    </p>
    <div class="example">
      <label class="fs-15p" for="">EXAMPLE</label>
      <p><b>The mother held her newborn _ _ _</b></p>
      <div class="radio">
        <label
          ><input type="radio" name="example" disabled />&nbsp;&nbsp;&nbsp;A. loving</label
        >
      </div>
      <div class="radio">
        <label
          ><input type="radio" name="example" disabled />&nbsp;&nbsp;&nbsp;B. lovely</label
        >
      </div>
      <div class="radio">
        <label
          ><input type="radio" name="example" checked />&nbsp;&nbsp;&nbsp;C. lovingly</label
        >
      </div>
      <div class="radio">
        <label
          ><input type="radio" name="example" disabled />&nbsp;&nbsp;&nbsp;D. love</label
        >
      </div>
    </div>
    <p>Correct answer (C)</p>
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
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART5_TITLE);
  },
  methods: {
    start() {
      try {
        var examID = JSON.parse(localStorage.getItem("selected-exam"))?.ExamID;
        this.$router.push(`/toeicexam/${examID}/part5-detail`);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
