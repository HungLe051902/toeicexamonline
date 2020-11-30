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
                <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'first'"
                    value="A"
                  />A. {{ item.FirstOptionA }}
                </label>
              </div>
              <div class="form-check">
                <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'first'"
                    value="B"
                  />B. {{ item.FirstOptionB }}
                </label>
              </div>
              <div class="form-check">
                <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'first'"
                    value="C"
                  />C. {{ item.FirstOptionC }}
                </label>
              </div>
              <div class="form-check">
                <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
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
                <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'second'"
                    value="A"
                  />A. {{ item.SecondOptionA }}
                </label>
              </div>
              <div class="form-check">
                <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'second'"
                    value="B"
                  />B. {{ item.SecondOptionB }}
                </label>
              </div>
              <div class="form-check">
                <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'second'"
                    value="C"
                  />C. {{ item.SecondOptionC }}
                </label>
              </div>
              <div class="form-check">
                <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
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
                <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'third'"
                    value="A"
                  />A. {{ item.ThirdOptionA }}
                </label>
              </div>
              <div class="form-check">
                <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'third'"
                    value="B"
                  />B. {{ item.ThirdOptionB }}
                </label>
              </div>
              <div class="form-check">
                <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'third'"
                    value="C"
                  />C. {{ item.ThirdOptionC }}
                </label>
              </div>
              <div class="form-check">
                <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
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
      Tiếp tục
    </button>
    <button v-on:click="saveAnswerToLocalStorage(true)" class="btn h-btn-primary mb-4 ml-3">
      Ghi nhận câu trả lời
    </button>
  </div>
</template>
<script>
import titleResource from "@/assets/resources/title.js";
import { mapGetters } from "vuex";
import $ from "jquery";
import toeicExamMixin from "@/mixins/toeicexam.vue";
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
  mixins: [toeicExamMixin],
  mounted(){
    this.handleAfterLoadData();
  },
  methods: {
    /**
    Hàm lắng nghe sự kiện để lưu câu trả lời vào localStorage
    Author: LXHUNG(30/11/2020)
     */
    autoSaveAnswer(e){
      if (e.target.nodeName == 'LABEL') return;
      this.saveAnswerToLocalStorage();
    },
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
        if (localStorage.getItem("part4Answer")) {
          var i = 0;
          var part4Answer = JSON.parse(localStorage.getItem("part4Answer"));
          this.$nextTick(function () {
            $.each($("#part4-detail .group-question"), function () {
              if (part4Answer[i].FirstAnswer) {
                $.each($(this).find('.first-question .option-area').find("input"), function () {
                  if ($(this).val() == part4Answer[i].FirstAnswer) {
                    $(this).prop("checked", true);
                  }
                });
              }
              if (part4Answer[i].SecondAnswer) {
                $.each($(this).find('.second-question .option-area').find("input"), function () {
                  if ($(this).val() == part4Answer[i].SecondAnswer) {
                    $(this).prop("checked", true);
                  }
                });
              }
              if (part4Answer[i].ThirdAnswer) {
                $.each($(this).find('.third-question .option-area').find("input"), function () {
                  if ($(this).val() == part4Answer[i].ThirdAnswer) {
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
    /**
      Lưu các câu trả lời vào local storage
     */
    saveAnswerToLocalStorage(isShowMessage) {
      try {
        var part4Answer = [];
        $.each($("#part4-detail .group-question"), function () {
          var objAnswer = {};
          objAnswer.FirstAnswer = $(this).find('.first-question').find('input:checked').val();
          objAnswer.SecondAnswer = $(this).find('.second-question').find('input:checked').val();
          objAnswer.ThirdAnswer = $(this).find('.third-question').find('input:checked').val();
          part4Answer.push(objAnswer);
        });
        localStorage.setItem("part4Answer", JSON.stringify(part4Answer));
        if (isShowMessage) this.showNoti('success', 'Ghi nhận câu trả lời thành công!');
      } catch (e) {
        console.log(e);
      }
    },
    // Chuyển sang làm part5
    nextToPart5() {
      try {
        // Lưu các câu trả lời vào local storage
        this.saveAnswerToLocalStorage();
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
          return ;
        }
        this.handleAfterLoadData();
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