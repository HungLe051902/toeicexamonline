<template>
  <div id="part1-detail" v-loading="isShowLoading">
    <h3>PART 1</h3>
    <div class="question-area">
      <div v-for="(item, index) in part1Data" :key="item.QuestionID">
        <label for=""
          ><b>{{ index + 1 }}. {{ item.Title }}</b></label
        >
        <audio controls class="d-block mt-3 w-100">
          <source :src="item.LinkAudio" type="audio/mp3" />
        </audio>

        <img :src="item.LinkImg" class="w-100 my-3" alt="" />
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
          <label class="radio-inline"
            ><input type="radio" :name="item.QuestionID" />&nbsp;D</label
          >
        </div>
      </div>
    </div>
    <button v-on:click="nextToPart2" class="btn h-btn-primary mb-4">
      Next
    </button>
  </div>
</template>
<script>
import ToeicExamService from "@/services/toeicExamService.js";
import titleResource from "@/assets/resources/title.js";
export default {
  data() {
    return {
      selectedExam: null,
      part1Data: null,
      isShowLoading: false,
    };
  },
  props: {},
  async created() {
    // Đổi tiêu đề trên thanh header
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART1_TITLE);
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
    // Lấy dữ liệu part 1
    this.getQuestionPart1();
  },
  methods: {
    // Lấy câu hỏi part 1
    async getQuestionPart1() {
      try {
        this.isShowLoading = true;
        var res = await ToeicExamService.getQuestionPart1ByYearAndExamNo(
          this.selectedExam?.Year,
          this.selectedExam?.ExamCode
        );
        this.isShowLoading = false;
        if (res) {
          if (res.data.APPCode == 200) {
            this.part1Data = res.data.Data;
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
    // Chuyển sang phần 2
    nextToPart2() {
      try {
        this.$router.push(
          `/toeicexam/${this.selectedExam?.ExamID}/part2-instruction`
        );
      } catch (e) {
        console.log(e);
      }
    },
  },

  computed: {
    // ...mapState("toeicexam", ["headerTitle"])
  },
};
</script>
<style lang="scss" scoped>
#part1-detail {
  height: 100%;
  width: 600px;
  max-width: 800px;
  margin: auto;
}
</style>