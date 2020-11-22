<template>
  <div id="part3-detail" v-loading="isShowLoading">
    <h5>Part III: Short Conversations</h5>
    <div>
      <div
        class="group-question"
        v-for="(item, index) in getPart3Data"
        :key="item.GroupQuestionID"
      >
        <label class="mb-0" for=""
          ><b
            >Question {{ 32 + index * 3 }}-{{ 32 + index * 3 + 2 }} refer to
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
                ><b>{{ 32 + index * 3 }}. {{ item.FirstQuestion }}</b></label
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
                  >{{ 32 + index * 3 + 1 }}. {{ item.SecondQuestion }}</b
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
                  >{{ 32 + index * 3 + 2 }}. {{ item.ThirdQuestion }}</b
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
    <button v-on:click="nextToPart4" class="btn h-btn-primary mb-4">
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
        if (this.getPart3Data && this.getPart3Data.length > 0) {
          return;
        }
        this.isShowLoading = true;
        var res = await this.$store.dispatch("toeicexam/getQuestionByPart", {
          part: "PART_3",
          year: this.selectedExam?.Year,
          examNo: this.selectedExam?.ExamCode,
        });
        this.isShowLoading = false;
        if (!res) {
          this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
        }
        // this.isShowLoading = true;
        // var res = await ToeicExamService.getQuestionPart3ByYearAndExamNo(
        //   this.selectedExam?.Year,
        //   this.selectedExam?.ExamCode
        // );
        // this.isShowLoading = false;
        // if (res) {
        //   if (res.data.APPCode == 200) {
        //     this.part3Data = res.data.Data;
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
    ...mapGetters("toeicexam", ["getPart3Data"]),
  }
};
</script>
<style lang="scss" scoped>
</style>