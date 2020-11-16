<template>
  <div id="part1-detail" v-loading="isShowLoading">
    <h1>PART1-DETAIL</h1>
  </div>
</template>
<script>
import ToeicExamService from "@/services/toeicExamService.js";
export default {
  methods: {},
  data() {
    return {
      selectedExam: null,
      part1Data: null,
      isShowLoading: false
    };
  },
  props: {},
  async created() {
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
    // Lấy dữ liệu part 1
    this.isShowLoading = true;
    var res = await ToeicExamService.getQuestionPart1ByYearAndExamNo(this.selectedExam?.Year, this.selectedExam?.ExamNo);
    this.isShowLoading = false;
    if (res){
      if (res.data.APPCode == 200){
        console.log("sucess");
      }else{
        this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
      }
    }
    else {
      this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
    }
  },
};
</script>
<style lang="scss" scoped>
</style>