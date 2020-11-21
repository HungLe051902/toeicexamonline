<template>
  <div id="part7-detail" v-loading="isShowLoading">
    <h5>Part VII: Reading Comprehension</h5>
    <button v-on:click="done" class="btn h-btn-primary mb-4">Hoàn thành</button>
  </div>
</template>
<script>
import titleResource from "@/assets/resources/title.js";
import ToeicExamService from "@/services/toeicExamService.js";
export default {
  created() {
    // Đổi tiêu đề trên thanh header
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART7_TITLE);
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
    // Lấy dữ liệu part 1
    this.getQuestionPart7();
  },
  data() {
    return {
      selectedExam: null,
      isShowLoading: false,
      part7Data: [],
    };
  },
  methods: {
    // Nộp bài
    done() {
      try {
        // this.$router.push(
        //   `/toeicexam/${this.selectedExam?.ExamID}/part6-instruction`
        // );
        alert("done");
      } catch (e) {
        console.log(e);
      }
    },
    // Lấy câu hỏi part2
    async getQuestionPart7() {
      try {
        this.isShowLoading = true;
        var res = await ToeicExamService.getQuestionPart7ByYearAndExamNo(
          this.selectedExam?.Year,
          this.selectedExam?.ExamCode
        );
        this.isShowLoading = false;
        if (res) {
          if (res.data.APPCode == 200) {
            this.part7Data = res.data.Data;
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
<style lang="scss" scoped>
</style>