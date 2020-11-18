<template>
  <div id="part2-detail" v-loading="isShowLoading">
    <h5>Part II: Question - Response</h5>
    <h6>Mark your answer on your answer sheet:</h6>
    <div class="audio-area">
      <audio controls class="d-block mt-3 w-100">
        <source
          :src="
            part2Data
              ? part2Data[0].LinkAudio
              : 'https://firebasestorage.googleapis.com/v0/b/test1-part2.appspot.com/o/part2%2Ftest1_part2.mp3?alt=media&token=f2de3b84-e7aa-43cb-82c8-d052b2f021c3'
          "
          type="audio/mp3"
        />
      </audio>
    </div>
    <div class="question-area mt-3 row">
      <div
        class="question col-3"
        v-for="(item, index) in part2Data"
        :key="item.QuestionID"
      >
        <label for=""
          ><b>{{ index + 7 }}.</b></label
        >
        <div class="option-area">
          <label class="radio-inline mr-3"
            ><input type="radio" :name="item.QuestionID" />&nbsp;A</label
          >
          <label class="radio-inline mr-3"
            ><input type="radio" :name="item.QuestionID" />&nbsp;B</label
          >
          <label class="radio-inline mr-3"
            ><input type="radio" :name="item.QuestionID" />&nbsp;C</label
          >
        </div>
      </div>
    </div>
    <button v-on:click="nextToPart3" class="btn h-btn-primary mb-4">
      Next
    </button>
  </div>
</template>
<script>
import titleResource from "@/assets/resources/title.js";
import ToeicExamService from "@/services/toeicExamService.js";
export default {
  created() {
    // Đổi tiêu đề trên thanh header
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART2_TITLE);
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
    // Lấy dữ liệu part 1
    this.getQuestionPart2();
  },
  data() {
    return {
      selectedExam: null,
      isShowLoading: false,
      part2Data: [],
    };
  },
  methods: {
    // Chuyển sang làm part3
    nextToPart3() {
      try {
          this.$router.push(
          `/toeicexam/${this.selectedExam?.ExamID}/part3-instruction`
        );
      } catch (e) {
        console.log(e);
      }
    },
    // Lấy câu hỏi part2
    async getQuestionPart2() {
      try {
        this.isShowLoading = true;
        var res = await ToeicExamService.getQuestionPart2ByYearAndExamNo(
          this.selectedExam?.Year,
          this.selectedExam?.ExamCode
        );
        this.isShowLoading = false;
        if (res) {
          if (res.data.APPCode == 200) {
            this.part2Data = res.data.Data;
          } else {
            this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
          }
        } else {
          this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
