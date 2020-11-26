<template>
  <div id="part3-detail" v-loading="isShowLoading">
    <h5>Part III: Short Conversations</h5>
    <div>
      <div
        class=""
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
        <div class="group-question mb-5">
          <div class="first-question">
            <div class="question">
              <label for=""
                ><b>{{ 32 + index * 3 }}. {{ item.FirstQuestion }}</b></label
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
                  >{{ 32 + index * 3 + 1 }}. {{ item.SecondQuestion }}</b
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
                  >{{ 32 + index * 3 + 2 }}. {{ item.ThirdQuestion }}</b
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
    <button v-on:click="nextToPart4" class="btn h-btn-primary mb-4">
      Next
    </button>
    <button v-on:click="saveAnswerToLocalStorage" class="btn h-btn-primary mb-4 ml-3">
      Ghi nhận câu trả lời
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
      isFinished: false,
    };
  },
  mounted(){
    this.handleAfterLoadData();
  },
  methods: {
    /**
      Hàm xử lý sau khi tải xong dữ liệu
      Author: LXHUNG(26/11/2020)
     */
    handleAfterLoadData() {
      try {
        var vm = this;
        // Binding các câu trả lời đã chọn cũ
        vm.bindingAnswer();
        /**
          Lắng nghe sự kiện nộp bài để hiển thị đáp án và lời giải
        */
        // Nếu thông tin thời gian kết thúc trong localStorage được xóa (tức là người thi đã nộp bài) thì hiển thị đáp án và lời giải
        if (!localStorage.getItem("timeEnd")) vm.finish();
      } catch (e) {
        console.log(e);
      }
    },
    /**
    Hàm hiển thị lại câu trả lời của người dùng
     */ 
    bindingAnswer() {
      try {
        if (localStorage.getItem("part3Answer")) {
          var i = 0;
          var part3Answer = JSON.parse(localStorage.getItem("part3Answer"));
          this.$nextTick(function () {
            $.each($("#part3-detail .group-question"), function () {
              if (part3Answer[i].FirstAnswer) {
                $.each($(this).find('.first-question .option-area').find("input"), function () {
                  if ($(this).val() == part3Answer[i].FirstAnswer) {
                    $(this).prop("checked", true);
                  }
                });
              }
              if (part3Answer[i].SecondAnswer) {
                $.each($(this).find('.second-question .option-area').find("input"), function () {
                  if ($(this).val() == part3Answer[i].SecondAnswer) {
                    $(this).prop("checked", true);
                  }
                });
              }
              if (part3Answer[i].ThirdAnswer) {
                $.each($(this).find('.third-question .option-area').find("input"), function () {
                  if ($(this).val() == part3Answer[i].ThirdAnswer) {
                    $(this).prop("checked", true);
                  }
                });
              }
              i++;
            });
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    // test
    finish() {
      try {
        var me = this;
        this.isFinished = true;
        var indexFirst = 0,
          indexSecond = 0,
          indexThird = 0;
        $.each(
          $("#part3-detail .group-question .first-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 1
              $(this).prop("disabled", true);
              var input = this;
              if ($(input).val() == me.getPart3Data[indexFirst]?.FirstAnswer) {
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
          $("#part3-detail .group-question .second-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 2
              $(this).prop("disabled", true);
              var input = this;
              if (
                $(input).val() == me.getPart3Data[indexSecond]?.SecondAnswer
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
          $("#part3-detail .group-question .third-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 3
              $(this).prop("disabled", true);
              var input = this;
              if ($(input).val() == me.getPart3Data[indexThird]?.ThirdAnswer) {
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
    // Lấy câu hỏi part 1
    async getQuestionPart1() {
      try {
        if (this.getPart1Data && this.getPart1Data.length > 0) {
          return;
        }
        this.isShowLoading = true;
        var res = await this.$store.dispatch("toeicexam/getQuestionByPart", {
          part: "PART_1",
          year: this.selectedExam?.Year,
          examNo: this.selectedExam?.ExamCode,
        });
        this.isShowLoading = false;
        if (!res) {
          this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
      Lưu các câu trả lời vào local storage
     */
    saveAnswerToLocalStorage() {
      try {
        var part3Answer = [];
        $.each($("#part3-detail .group-question"), function () {
          var objAnswer = {};
          objAnswer.FirstAnswer = $(this).find('.first-question').find('input:checked').val();
          objAnswer.SecondAnswer = $(this).find('.second-question').find('input:checked').val();
          objAnswer.ThirdAnswer = $(this).find('.third-question').find('input:checked').val();
          part3Answer.push(objAnswer);
        });
        localStorage.setItem("part3Answer", JSON.stringify(part3Answer));
      } catch (e) {
        console.log(e);
      }
    },
    /**
    Chuyển sang làm part4
     */ 
    nextToPart4() {
      try {
        // Lưu các câu trả lời vào local storage
        this.saveAnswerToLocalStorage();
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
          return ;
        }
        this.handleAfterLoadData();
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ...mapGetters("toeicexam", ["getPart3Data"]),
  },
};
</script>
<style lang="scss" scoped>
</style>