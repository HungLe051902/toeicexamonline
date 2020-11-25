<template>
  <div id="part7-detail" v-loading="isShowLoading">
    <h5>Part VII: Reading Comprehension</h5>
    <div class="list-question">
      <div
        class="group-question mb-5"
        v-for="item in getPart7Data"
        :key="item.QuestionID"
      >
        <label for=""
          ><b
            >Question {{ showRangeQuestion(item) }} refer to following
            paragraph:</b
          ></label
        >
        <img :src="item.LinkImg" alt="" />
        <div class="first-question">
          <label for=""
            ><b>{{ item.StartNumber }}. {{ item.FirstQuestion }}</b></label
          >
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
          <label for=""
            ><b>{{ item.StartNumber + 1 }}. {{ item.SecondQuestion }}</b></label
          >
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
        <div class="third-question" v-if="calculateRangeQuestion(item) >= 3">
          <label for=""
            ><b>{{ item.StartNumber + 2 }}. {{ item.ThirdQuestion }}</b></label
          >
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
        <div class="fourth-question" v-if="calculateRangeQuestion(item) >= 4">
          <label for=""
            ><b>{{ item.StartNumber + 3 }}. {{ item.FourthQuestion }}</b></label
          >
          <div class="option-area">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  :name="item.GroupQuestionID + 'fourth'"
                  value="A"
                />A. {{ item.FourthOptionA }}
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  :name="item.GroupQuestionID + 'fourth'"
                  value="B"
                />B. {{ item.FourthOptionB }}
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  :name="item.GroupQuestionID + 'fourth'"
                  value="C"
                />C. {{ item.FourthOptionC }}
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  :name="item.GroupQuestionID + 'fourth'"
                  value="D"
                />D. {{ item.FourthOptionD }}
              </label>
            </div>
          </div>
        </div>
        <div class="fifth-question" v-if="calculateRangeQuestion(item) >= 5">
          <label for=""
            ><b>{{ item.StartNumber + 4 }}. {{ item.FifthQuestion }}</b></label
          >
          <div class="option-area">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  :name="item.GroupQuestionID + 'fifth'"
                  value="A"
                />A. {{ item.FifthOptionA }}
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  :name="item.GroupQuestionID + 'fifth'"
                  value="B"
                />B. {{ item.FifthOptionB }}
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  :name="item.GroupQuestionID + 'fifth'"
                  value="C"
                />C. {{ item.FifthOptionC }}
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  :name="item.GroupQuestionID + 'fifth'"
                  value="D"
                />D. {{ item.FifthOptionD }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button v-on:click="done" class="btn h-btn-primary mb-4">Hoàn thành</button>
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
    };
  },
  mounted() {
    // Binding các câu trả lời cũ
    this.bindingAnswer();
  },
  methods: {
    /**
    Hàm hiển thị lại câu trả lời của người dùng
     */
    bindingAnswer() {
      try {
        if (localStorage.getItem("part7Answer")) {
          var i = 0;
          var part7Answer = JSON.parse(localStorage.getItem("part7Answer"));
          this.$nextTick(function () {
            $.each($("#part7-detail .group-question"), function () {
              if (part7Answer[i].FirstAnswer) {
                $.each(
                  $(this).find(".first-question .option-area").find("input"),
                  function () {
                    if ($(this).val() == part7Answer[i].FirstAnswer) {
                      $(this).prop("checked", true);
                    }
                  }
                );
              }
              if (part7Answer[i].SecondAnswer) {
                $.each(
                  $(this).find(".second-question .option-area").find("input"),
                  function () {
                    if ($(this).val() == part7Answer[i].SecondAnswer) {
                      $(this).prop("checked", true);
                    }
                  }
                );
              }
              if (part7Answer[i].ThirdAnswer) {
                $.each(
                  $(this).find(".third-question .option-area").find("input"),
                  function () {
                    if ($(this).val() == part7Answer[i].ThirdAnswer) {
                      $(this).prop("checked", true);
                    }
                  }
                );
              }
              if (part7Answer[i].FourthAnswer) {
                $.each(
                  $(this).find(".fourth-question .option-area").find("input"),
                  function () {
                    if ($(this).val() == part7Answer[i].FourthAnswer) {
                      $(this).prop("checked", true);
                    }
                  }
                );
              }
              if (part7Answer[i].FifthAnswer) {
                $.each(
                  $(this).find(".fifth-question .option-area").find("input"),
                  function () {
                    if ($(this).val() == part7Answer[i].FifthAnswer) {
                      $(this).prop("checked", true);
                    }
                  }
                );
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
          indexThird = 0,
          indexFourth = 0,
          indexFifth = 0;
        $.each(
          $("#part7-detail .group-question .first-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 1
              $(this).prop("disabled", true);
              var input = this;
              if ($(input).val() == me.getPart7Data[indexFirst]?.FirstAnswer) {
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
          $("#part7-detail .group-question .second-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 2
              $(this).prop("disabled", true);
              var input = this;
              if (
                $(input).val() == me.getPart7Data[indexSecond]?.SecondAnswer
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
          $("#part7-detail .group-question .third-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 3
              $(this).prop("disabled", true);
              var input = this;
              if ($(input).val() == me.getPart7Data[indexThird]?.ThirdAnswer) {
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

        $.each(
          $("#part7-detail .group-question .fourth-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 4
              $(this).prop("disabled", true);
              var input = this;
              if ($(input).val() == me.getPart7Data[indexFourth]?.FirstAnswer) {
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
            indexFourth++;
          }
        );

        $.each(
          $("#part7-detail .group-question .fifth-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 5
              $(this).prop("disabled", true);
              var input = this;
              if ($(input).val() == me.getPart7Data[indexFifth]?.FirstAnswer) {
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
            indexFifth++;
          }
        );
      } catch (e) {
        console.log(e);
      }
    },
    // Hiển thị phạm vi câu hỏi
    showRangeQuestion(item) {
      try {
        var range = this.calculateRangeQuestion(item);
        return `${item.StartNumber} - ${item.StartNumber + range - 1}`;
      } catch (e) {
        console.log(e);
      }
    },
    // Tính phạm vi câu hỏi
    calculateRangeQuestion(item) {
      try {
        return (
          2 +
          (typeof item.ThirdQuestion != "object" ? 1 : 0) +
          (typeof item.FourthQuestion != "object" ? 1 : 0) +
          (typeof item.FifthQuestion != "object" ? 1 : 0)
        );
      } catch (e) {
        console.log(e);
      }
    },
    /**
      Lưu các câu trả lời vào local storage
     */
    saveAnswerToLocalStorage() {
      try {
        var part7Answer = [];
        $.each($("#part7-detail .group-question"), function () {
          var objAnswer = {};
          objAnswer.FirstAnswer = $(this)
            .find(".first-question")
            .find("input:checked")
            .val();
          objAnswer.SecondAnswer = $(this)
            .find(".second-question")
            .find("input:checked")
            .val();
          objAnswer.ThirdAnswer = $(this)
            .find(".third-question")
            .find("input:checked")
            .val();
          objAnswer.FourthAnswer = $(this)
            .find(".fourth-question")
            .find("input:checked")
            .val();
          objAnswer.FifthAnswer = $(this)
            .find(".fifth-question")
            .find("input:checked")
            .val();
          part7Answer.push(objAnswer);
        });
        localStorage.setItem("part7Answer", JSON.stringify(part7Answer));
      } catch (e) {
        console.log(e);
      }
    },
    // Nộp bài
    done() {
      try {
        // Lưu câu trả lời vào localStorage
        this.saveAnswerToLocalStorage();
        alert("done");
      } catch (e) {
        console.log(e);
      }
    },
    // Lấy câu hỏi part2
    async getQuestionPart7() {
      try {
        if (this.getPart7Data && this.getPart7Data.length > 0) {
          return;
        }
        this.isShowLoading = true;
        var res = await this.$store.dispatch("toeicexam/getQuestionByPart", {
          part: "PART_7",
          year: this.selectedExam?.Year,
          examNo: this.selectedExam?.ExamCode,
        });
        this.isShowLoading = false;
        if (!res) {
          this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
          return;
        }
        // Binding các câu trả lời cũ
        this.bindingAnswer();
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ...mapGetters("toeicexam", ["getPart7Data"]),
  },
};
</script>
<style lang="scss" scoped>
</style>