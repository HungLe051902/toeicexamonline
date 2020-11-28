<template>
  <div id="part6-detail" v-loading="isShowLoading">
    <h5>Part VI: Text Completion</h5>
    <div class="list-question">
      <div
        class=""
        v-for="(item, index) in getPart6Data"
        :key="item.GroupQuestionID"
      >
        <label class="mb-0" for=""
          ><b
            >Question {{ 131 + index * 4 }}-{{ 131 + index * 4 + 3 }} refer to
            following paragraph:</b
          ></label
        >
        <img :src="item.LinkImg" alt="" />
        <div class="group-question mb-5">
          <div class="first-question">
            <label for=""
              ><b>{{ 131 + index * 4 }}. _ _(1)_ _</b></label
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
              ><b>{{ 131 + index * 4 + 1 }}. _ _(2)_ _</b></label
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
          <div class="third-question">
            <label for=""
              ><b>{{ 131 + index * 4 + 2 }}. _ _(3)_ _</b></label
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
          <div class="fourth-question">
            <label for=""
              ><b>{{ 131 + index * 4 + 3 }}. _ _(4)_ _</b></label
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
        </div>
      </div>
    </div>
    <button v-on:click="nextToPart7" class="btn h-btn-primary mb-4">
      Tiếp tục
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
    };
  },
  mounted() {
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
        if (!localStorage.getItem("timeEnd")) {
          this.$nextTick(function(){
            vm.finish();
          })
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
    Hàm hiển thị lại câu trả lời của người dùng
     */
    bindingAnswer() {
      try {
        if (localStorage.getItem("part6Answer")) {
          var i = 0;
          var part6Answer = JSON.parse(localStorage.getItem("part6Answer"));
          this.$nextTick(function () {
            $.each($("#part6-detail .group-question"), function () {
              if (part6Answer[i].FirstAnswer) {
                $.each(
                  $(this).find(".first-question .option-area").find("input"),
                  function () {
                    if ($(this).val() == part6Answer[i].FirstAnswer) {
                      $(this).prop("checked", true);
                    }
                  }
                );
              }
              if (part6Answer[i].SecondAnswer) {
                $.each(
                  $(this).find(".second-question .option-area").find("input"),
                  function () {
                    if ($(this).val() == part6Answer[i].SecondAnswer) {
                      $(this).prop("checked", true);
                    }
                  }
                );
              }
              if (part6Answer[i].ThirdAnswer) {
                $.each(
                  $(this).find(".third-question .option-area").find("input"),
                  function () {
                    if ($(this).val() == part6Answer[i].ThirdAnswer) {
                      $(this).prop("checked", true);
                    }
                  }
                );
              }
              if (part6Answer[i].FourthAnswer) {
                $.each(
                  $(this).find(".fourth-question .option-area").find("input"),
                  function () {
                    if ($(this).val() == part6Answer[i].FourthAnswer) {
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
          indexFourth = 0;
        $.each(
          $("#part6-detail .group-question .first-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 1
              $(this).prop("disabled", true);
              var input = this;
              if ($(input).val() == me.getPart6Data[indexFirst]?.FirstAnswer) {
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
          $("#part6-detail .group-question .second-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 2
              $(this).prop("disabled", true);
              var input = this;
              if (
                $(input).val() == me.getPart6Data[indexSecond]?.SecondAnswer
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
          $("#part6-detail .group-question .third-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 3
              $(this).prop("disabled", true);
              var input = this;
              if ($(input).val() == me.getPart6Data[indexThird]?.ThirdAnswer) {
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
          $("#part6-detail .group-question .fourth-question .option-area"),
          function () {
            var vm = this;
            $.each($(vm).find("input"), function () {
              // Disable tất cả input câu hỏi thứ 4
              $(this).prop("disabled", true);
              var input = this;
              if ($(input).val() == me.getPart6Data[indexFourth]?.FirstAnswer) {
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
      } catch (e) {
        console.log(e);
      }
    },
    /**
      Lưu các câu trả lời vào local storage
     */
    saveAnswerToLocalStorage() {
      try {
        var part6Answer = [];
        $.each($("#part6-detail .group-question"), function () {
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
          part6Answer.push(objAnswer);
        });
        localStorage.setItem("part6Answer", JSON.stringify(part6Answer));
      } catch (e) {
        console.log(e);
      }
    },
    // Chuyển sang làm part7
    nextToPart7() {
      try {
        // Lưu các câu trả lời vào localStorage
        this.saveAnswerToLocalStorage();
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
        if (this.getPart6Data && this.getPart6Data.length > 0) {
          return;
        }
        this.isShowLoading = true;
        var res = await this.$store.dispatch("toeicexam/getQuestionByPart", {
          part: "PART_6",
          year: this.selectedExam?.Year,
          examNo: this.selectedExam?.ExamCode,
        });
        this.isShowLoading = false;
        if (!res) {
          this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
          return;
        }
        this.handleAfterLoadData();
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ...mapGetters("toeicexam", ["getPart6Data"]),
  },
};
</script>
<style lang="scss" scoped>
</style>