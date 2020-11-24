<template>
  <div id="part4-detail" v-loading="isShowLoading">
    <h5>Part IV: Short Talks</h5>
    <div class="list-question">
      <div
        class=""
        v-for="(item, index) in getPart4Data"
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
        <div class="group-question mb-5">
          <div class="first-question">
            <div class="question">
              <label for=""
                ><b>{{ 71 + index * 3 }}. {{ item.FirstQuestion }}</b></label
              >
            </div>
            <div class="option-area">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'first'"
                    value="A"
                  />A. {{ item.FirstOptionA }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'first'"
                    value="B"
                  />B. {{ item.FirstOptionB }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'first'"
                    value="C"
                  />C. {{ item.FirstOptionC }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'first'"
                    value="D"
                  />D. {{ item.FirstOptionD }}
                </label>
              </div>
            </div>
          </div>
          <div class="second-question">
            <div class="question">
              <label for=""
                ><b
                  >{{ 71 + index * 3 + 1 }}. {{ item.SecondQuestion }}</b
                ></label
              >
            </div>
            <div class="option-area">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'second'"
                    value="A"
                  />A. {{ item.SecondOptionA }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'second'"
                    value="B"
                  />B. {{ item.SecondOptionB }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'second'"
                    value="C"
                  />C. {{ item.SecondOptionC }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'second'"
                    value="D"
                  />D. {{ item.SecondOptionD }}
                </label>
              </div>
            </div>
          </div>
          <div class="third-question">
            <div class="question">
              <label for=""
                ><b
                  >{{ 71 + index * 3 + 2 }}. {{ item.ThirdQuestion }}</b
                ></label
              >
            </div>
            <div class="option-area">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'third'"
                    value="A"
                  />A. {{ item.ThirdOptionA }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'third'"
                    value="B"
                  />B. {{ item.ThirdOptionB }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'third'"
                    value="C"
                  />C. {{ item.ThirdOptionC }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'third'"
                    value="D"
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
    <button v-on:click="finish" class="btn h-btn-primary mb-4 ml-3">
      Chấm điểm
    </button>
  </div>
</template>
<script>
import titleResource from "@/assets/resources/title.js";
import { mapGetters } from "vuex";
import $ from "jquery";
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
      isFinished: false,
    };
  },
  methods: {
    // test
    finish() {
      try {
        var me = this;
        this.isFinished = true;
        var indexFirst = 0,
          indexSecond = 0,
          indexThird = 0;
        $.each(
          $("#part4-detail .group-question .first-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 1
              $(this).prop("disabled", true);
              var input = this;
              if ($(input).val() == me.getPart4Data[indexFirst]?.FirstAnswer) {
                me.$nextTick(function () {
                  $(input).parent().addClass("correct");
                });
              } else {
                if ($(input).is(":checked")) {
                  me.$nextTick(function () {
                    $(input).parent().addClass("wrong");
                  });
                }
              }
            });
            indexFirst++;
          }
        );

        $.each(
          $("#part4-detail .group-question .second-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 2
              $(this).prop("disabled", true);
              var input = this;
              if (
                $(input).val() == me.getPart4Data[indexSecond]?.SecondAnswer
              ) {
                me.$nextTick(function () {
                  $(input).parent().addClass("correct");
                });
              } else {
                if ($(input).is(":checked")) {
                  me.$nextTick(function () {
                    $(input).parent().addClass("wrong");
                  });
                }
              }
            });
            indexSecond++;
          }
        );

        $.each(
          $("#part4-detail .group-question .third-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 3
              $(this).prop("disabled", true);
              var input = this;
              if ($(input).val() == me.getPart4Data[indexThird]?.ThirdAnswer) {
                me.$nextTick(function () {
                  $(input).parent().addClass("correct");
                });
              } else {
                if ($(input).is(":checked")) {
                  me.$nextTick(function () {
                    $(input).parent().addClass("wrong");
                  });
                }
              }
            });
            indexThird++;
          }
        );
      } catch (e) {
        console.log(e);
      }
    },
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
        if (this.getPart4Data && this.getPart4Data.length > 0) {
          return;
        }
        this.isShowLoading = true;
        var res = await this.$store.dispatch("toeicexam/getQuestionByPart", {
          part: "PART_4",
          year: this.selectedExam?.Year,
          examNo: this.selectedExam?.ExamCode,
        });
        this.isShowLoading = false;
        if (!res) {
          this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
        }
        // this.isShowLoading = true;
        // var res = await ToeicExamService.getQuestionPart4ByYearAndExamNo(
        //   this.selectedExam?.Year,
        //   this.selectedExam?.ExamCode
        // );
        // this.isShowLoading = false;
        // if (res) {
        //   if (res.data.APPCode == 200) {
        //     this.part4Data = res.data.Data;
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
    ...mapGetters("toeicexam", ["getPart4Data"]),
  },
};
</script>
<style lang="scss" scoped>
</style>