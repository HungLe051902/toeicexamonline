<template>
    <div>
        <h1>THIS IS part 3</h1>
    </div>
</template>
<script>
import titleResource from "@/assets/resources/title.js";
import ToeicExamService from "@/services/toeicExamService.js";
export default {
    created() {
    // Đổi tiêu đề trên thanh header
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART3_TITLE);
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
    // Lấy dữ liệu part 1
    this.getQuestionPart3();
  },
  data() {
    return {
      selectedExam: null,
      isShowLoading: false,
      part3Data: [],
    };
  },
  methods: {
    // Chuyển sang làm part4
    nextToPart4() {
      try {
          this.$router.push(
          `/toeicexam/${this.selectedExam?.ExamID}/part4-instruction`
        );
      } catch (e) {
        console.log(e);
      }
    },
    // Lấy câu hỏi part2
    async getQuestionPart3() {
      try {
        this.isShowLoading = true;
        var res = await ToeicExamService.getQuestionPart3ByYearAndExamNo(
          this.selectedExam?.Year,
          this.selectedExam?.ExamCode
        );
        this.isShowLoading = false;
        if (res) {
          if (res.data.APPCode == 200) {
            this.part3Data = res.data.Data;
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
}
</script>
<style lang="scss" scoped>
    
</style>