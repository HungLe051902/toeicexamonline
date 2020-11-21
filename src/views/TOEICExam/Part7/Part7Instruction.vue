<template>
  <div id="part7-instruction">
    <p class="title"><b>Part VII: Reading Comprehension</b></p>
    <p>
      <b>Directions:</b> In this part you will read a selection of texts, such
      as magezine and newspaper articles, letters, and advertisements. Each text
      is followed by several questions. Select the best answer for each question
      and mark the letter (A), (B), (C) or (D) on your answer sheet.
    </p>
    <div class="example">
      <label class="fs-15p" for="">EXAMPLE</label>
      <p>
        Are you someone who enjoys trying new things and does not feel
        uncomfortable in new environment? Then why not get paid for it? CULTURE
        magazine is looking for individuals to go to new clubs, event, etc and
        write about the cultural scene they observe in these place. Interested?
        Send your resume to CULTURE@hotmail.com. Please no phone calls.
      </p>
      <p><b>What type of person would be best qualified for this job?</b></p>
      <div class="radio">
        <label
          ><input
            type="radio"
            name="part7-example"
            disabled
          />&nbsp;&nbsp;&nbsp;A. a homebody</label
        >
      </div>
      <div class="radio">
        <label
          ><input
            type="radio"
            name="part7-example"
            disabled
          />&nbsp;&nbsp;&nbsp;B. an introvert</label
        >
      </div>
      <div class="radio">
        <label
          ><input
            type="radio"
            name="part7-example"
            disabled
          />&nbsp;&nbsp;&nbsp;C. a clumsy person</label
        >
      </div>
      <div class="radio">
        <label
          ><input
            type="radio"
            name="part7-example"
            checked
          />&nbsp;&nbsp;&nbsp;D. a risk-taker</label
        >
      </div>
      <p>Correct answer (D)</p>
    </div>
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
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART7_TITLE);
  },
  methods: {
    start() {
      try {
        var examID = JSON.parse(localStorage.getItem("selected-exam"))?.ExamID;
        this.$router.push(`/toeicexam/${examID}/part7-detail`);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
