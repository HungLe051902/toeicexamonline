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
        <div class="option-area">
          <div class="form-check">
            <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
              <input
                type="radio"
                class="form-check-input"
                :name="item.QuestionID"
                value="A"
              />A. {{ item.OptionA }}
            </label>
          </div>
          <div class="form-check">
            <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
              <input
                type="radio"
                class="form-check-input"
                :name="item.QuestionID"
                value="B"
              />B. {{ item.OptionB }}
            </label>
          </div>
          <div class="form-check">
            <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
              <input
                type="radio"
                class="form-check-input"
                :name="item.QuestionID"
                value="C"
              />C. {{ item.OptionC }}
            </label>
          </div>
          <div class="form-check">
            <label v-on:click="autoSaveAnswer($event)" class="form-check-label">
              <input
                type="radio"
                class="form-check-input"
                :name="item.QuestionID"
                value="D"
              />D. {{ item.OptionD }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <button v-on:click="nextToPart6" class="btn h-btn-primary mb-4">
      Tiếp tục
    </button>
    <!--<button v-on:click="saveAnswerToLocalStorage(true)" class="btn h-btn-primary mb-4 ml-3">
      Ghi nhận câu trả lời
    </button>-->
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
      isFinished: false,
    };
  },
  mixins: [toeicExamMixin],
  mounted() {
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
    // Hàm hiển thị lại câu trả lời của người dùng
    bindingAnswer() {
      try {
        if (localStorage.getItem("part5Answer")) {
          var i = 0;
          var part5Answer = JSON.parse(localStorage.getItem("part5Answer"));
          this.$nextTick(function () {
            $.each($("#part5-detail .option-area"), function () {
              if (part5Answer[i]) {
                $.each($(this).find("input"), function () {
                  if ($(this).val() == part5Answer[i]) {
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
        var index = 0;
        $.each($("#part5-detail .option-area"), function () {
          var vm = this;
          $.each($(vm).find("input"), function () {
            // Disable tất cả input
            $(this).prop("disabled", true);
            var input = this;
            if ($(this).val() == me.getPart5Data[index]?.Answer) {
              me.$nextTick(function () {
                $(input).parent().addClass("correct");
              });
            } else {
              if ($(this).is(":checked")) {
                me.$nextTick(function () {
                  $(input).parent().addClass("wrong");
                });
              }
            }
          });
          index++;
        });
      } catch (e) {
        console.log(e);
      }
    },
    /**
      Lưu các câu trả lời vào local storage
     */
    saveAnswerToLocalStorage(isShowMessage) {
      try {
        var part5Answer = [];
        $.each($("#part5-detail .option-area"), function () {
          if ($(this).find("input:checked").length > 0) {
            part5Answer.push($(this).find("input:checked").val());
          } else {
            part5Answer.push(null);
          }
        });
        localStorage.setItem("part5Answer", JSON.stringify(part5Answer));
        if (isShowMessage) this.showNoti('success', 'Ghi nhận câu trả lời thành công!');
      } catch (e) {
        console.log(e);
      }
    },
    // Chuyển sang làm part6
    nextToPart6() {
      try {
        // Lưu các câu trả lời vào localStorage
        this.saveAnswerToLocalStorage();
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
          return;
        }
        this.handleAfterLoadData();
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ...mapGetters("toeicexam", ["getPart5Data"]),
  },
};
</script>
<style lang="scss" scoped>
</style>