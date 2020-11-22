<template>
  <div id="part5-detail" v-loading="isShowLoading">
    <h5>Part V: Incomplete Sentences</h5>
    <div class="list-question">
      <div
        class="question mb-5"
        v-for="(item, index) in getPart5Data"
        :key="item.QuestionID"
      >
        <label for=""
          ><b>{{ 101 + index }}. {{ item.Question }}</b></label
        >
        <div class="options">
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="radio"
                class="form-check-input"
                :name="item.QuestionID"
              />A. {{ item.OptionA }}
            </label>
          </div>
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="radio"
                class="form-check-input"
                :name="item.QuestionID"
              />B. {{ item.OptionB }}
            </label>
          </div>
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="radio"
                class="form-check-input"
                :name="item.QuestionID"
              />C. {{ item.OptionC }}
            </label>
          </div>
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="radio"
                class="form-check-input"
                :name="item.QuestionID"
              />D. {{ item.OptionD }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <button v-on:click="nextToPart6" class="btn h-btn-primary mb-4">
      Next
    </button>
  </div>
</template>
<script>
import titleResource from "@/assets/resources/title.js";
import { mapGetters } from "vuex";
export default {
  created() {
    // Đổi tiêu đề trên thanh header
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART5_TITLE);
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
    // Lấy dữ liệu part 1
    this.getQuestionPart5();
  },
  data() {
    return {
      selectedExam: null,
      isShowLoading: false,
    };
  },
  methods: {
    // Chuyển sang làm part6
    nextToPart6() {
      try {
        this.$router.push(
          `/toeicexam/${this.selectedExam?.ExamID}/part6-instruction`
        );
      } catch (e) {
        console.log(e);
      }
    },
    // Lấy câu hỏi part2
    async getQuestionPart5() {
      try {
        if (this.getPart5Data && this.getPart5Data.length > 0) {
          return;
        }
        this.isShowLoading = true;
        var res = await this.$store.dispatch("toeicexam/getQuestionByPart", {
          part: "PART_5",
          year: this.selectedExam?.Year,
          examNo: this.selectedExam?.ExamCode,
        });
        this.isShowLoading = false;
        if (!res) {
          this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
        }
        // this.isShowLoading = true;
        // var res = await ToeicExamService.getQuestionPart5ByYearAndExamNo(
        //   this.selectedExam?.Year,
        //   this.selectedExam?.ExamCode
        // );
        // this.isShowLoading = false;
        // if (res) {
        //   if (res.data.APPCode == 200) {
        //     this.part5Data = res.data.Data;
        //   } else {
        //     this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
        //   }
        // } else {
        //   this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
        // }
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ...mapGetters("toeicexam", ["getPart5Data"]),
  }
};
</script>
<style lang="scss" scoped>
</style>