<template>
  <div id="part2-instruction">
    <p class="title"><b>Part II: Question - Response</b></p>
    <p>
      <b>Directions:</b> In this part of the test, you will hear a question or
      statement spoken in English, followed by three responses, also spoken in
      English. The question or statement and the responses will be spoken just
      one time. They will not be printed in your test book, so you must listen
      carefully. You are to choose the best response to each question or
      statement. Now listen to a sample question.
    </p>
    <audio controls class="d-block mt-3 w-100">
      <source
        src="https://toeic24.vn/upload/audio/part_ii_intro.mp3"
        type="audio/mp3"
      />
    </audio>
    <div class="example-answer mt-3">
      <p><b class="fs-15p">You will hear:</b></p>
      <p><b>Why are you late?</b></p>
      <div class="radio">
        <label
          ><input type="radio" name="example" disabled />&nbsp;&nbsp;&nbsp;A. He
          is on the phone</label
        >
      </div>
      <div class="radio">
        <label
          ><input type="radio" name="example" checked />&nbsp;&nbsp;&nbsp;B. My
          car broke down</label
        >
      </div>
      <div class="radio">
        <label
          ><input type="radio" name="example" disabled />&nbsp;&nbsp;&nbsp;C. He
          alway is</label
        >
      </div>
      <p>
        The best response is choice <b>B</b>. "My car broke down". Therefore,
        you should choose <b>B</b>.
      </p>
      <button v-on:click="start" class="btn h-btn-primary">Bắt đầu</button>
    </div>
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
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART2_TITLE);
  },
  methods: {
    start() {
      try {
        var examID = JSON.parse(localStorage.getItem("selected-exam"))?.ExamID;
        this.$router.push(`/toeicexam/${examID}/part2-detail`);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
