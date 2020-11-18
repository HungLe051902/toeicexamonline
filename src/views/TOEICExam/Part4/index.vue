<template>
  <div id="part4-detail" v-loading="isShowLoading">
    <h5>Part IV: Short Talks</h5>
    <div class="list-question">
      <div
        class="group-question"
        v-for="(item, index) in part4Data"
        :key="item.GroupQuestionID"
      >
        <label class="mb-0" for=""
          ><b
            >Question {{ 71 + index * 3 }}-{{ 71 + index * 3 + 2 }} refer to
            following conversation:</b
          ></label
        >
        <audio controls class="d-block my-3 w-100">
          <source :src="item.LinkAudio" type="audio/mp3" />
        </audio>
        <div class="question-area mb-5">
          <div>
            <div class="question">
              <label for=""
                ><b>{{ 71 + index * 3 }}. {{ item.FirstQuestion }}</b></label
              >
            </div>
            <div class="options">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'first'"
                  />A. {{ item.FirstOptionA }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'first'"
                  />B. {{ item.FirstOptionB }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'first'"
                  />C. {{ item.FirstOptionC }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'first'"
                  />D. {{ item.FirstOptionD }}
                </label>
              </div>
            </div>
          </div>
          <div>
            <div class="question">
              <label for=""
                ><b
                  >{{ 71 + index * 3 + 1 }}. {{ item.SecondQuestion }}</b
                ></label
              >
            </div>
            <div class="options">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'second'"
                  />A. {{ item.SecondOptionA }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'second'"
                  />B. {{ item.SecondOptionB }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'second'"
                  />C. {{ item.SecondOptionC }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'second'"
                  />D. {{ item.SecondOptionD }}
                </label>
              </div>
            </div>
          </div>
          <div>
            <div class="question">
              <label for=""
                ><b
                  >{{ 71 + index * 3 + 2 }}. {{ item.ThirdQuestion }}</b
                ></label
              >
            </div>
            <div class="options">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'third'"
                  />A. {{ item.ThirdOptionA }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'third'"
                  />B. {{ item.ThirdOptionB }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'third'"
                  />C. {{ item.ThirdOptionC }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'third'"
                  />D. {{ item.ThirdOptionD }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button v-on:click="nextToPart5" class="btn h-btn-primary mb-4">
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
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART4_TITLE);
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
    // Lấy dữ liệu part 1
    this.getQuestionPart4();
  },
  data() {
    return {
      selectedExam: null,
      isShowLoading: false,
      part4Data: [],
    };
  },
  methods: {
    // Chuyển sang làm part5
    nextToPart5() {
      try {
        this.$router.push(
          `/toeicexam/${this.selectedExam?.ExamID}/part5-instruction`
        );
      } catch (e) {
        console.log(e);
      }
    },
    // Lấy câu hỏi part2
    async getQuestionPart4() {
      try {
        this.isShowLoading = true;
        var res = await ToeicExamService.getQuestionPart4ByYearAndExamNo(
          this.selectedExam?.Year,
          this.selectedExam?.ExamCode
        );
        this.isShowLoading = false;
        if (res) {
          if (res.data.APPCode == 200) {
            this.part4Data = res.data.Data;
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