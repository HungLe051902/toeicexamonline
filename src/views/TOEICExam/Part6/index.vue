<template>
  <div id="part6-detail" v-loading="isShowLoading">
    <h5>Part VI: Text Completion</h5>
    <div class="list-question">
      <div
        class="group-question"
        v-for="(item, index) in part6Data"
        :key="item.GroupQuestionID"
      >
        <label class="mb-0" for=""
          ><b
            >Question {{ 131 + index * 4 }}-{{ 131 + index * 4 + 3 }} refer to
            following paragraph:</b
          ></label
        >
        <img :src="item.LinkImg" alt="" />
        <div class="question-area mb-5">
          <div class="question">
            <label for=""
              ><b>{{ 131 + index * 4 }}. _ _(1)_ _</b></label
            >
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
          <div class="question">
            <label for=""
              ><b>{{ 131 + index * 4 + 1 }}. _ _(2)_ _</b></label
            >
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
          <div class="question">
            <label for=""
              ><b>{{ 131 + index * 4 + 2 }}. _ _(3)_ _</b></label
            >
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
          <div class="question">
            <label for=""
              ><b>{{ 131 + index * 4 + 3 }}. _ _(4)_ _</b></label
            >
            <div class="options">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'fourth'"
                  />A. {{ item.FourthOptionA }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'fourth'"
                  />B. {{ item.FourthOptionB }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'fourth'"
                  />C. {{ item.FourthOptionC }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'fourth'"
                  />D. {{ item.FourthOptionD }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button v-on:click="nextToPart7" class="btn h-btn-primary mb-4">
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
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART6_TITLE);
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
    // Lấy dữ liệu part 1
    this.getQuestionPart6();
  },
  data() {
    return {
      selectedExam: null,
      isShowLoading: false,
      part6Data: [],
    };
  },
  methods: {
    // Chuyển sang làm part7
    nextToPart7() {
      try {
        this.$router.push(
          `/toeicexam/${this.selectedExam?.ExamID}/part7-instruction`
        );
      } catch (e) {
        console.log(e);
      }
    },
    // Lấy câu hỏi part2
    async getQuestionPart6() {
      try {
        this.isShowLoading = true;
        var res = await ToeicExamService.getQuestionPart6ByYearAndExamNo(
          this.selectedExam?.Year,
          this.selectedExam?.ExamCode
        );
        this.isShowLoading = false;
        if (res) {
          if (res.data.APPCode == 200) {
            this.part6Data = res.data.Data;
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