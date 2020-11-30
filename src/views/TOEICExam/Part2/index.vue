<template>
  <div id="part2-detail" v-loading="isShowLoading">
    <h5>Part II: Question - Response</h5>
    <h6>Mark your answer on your answer sheet:</h6>
    <div class="audio-area">
      <audio controls class="d-block mt-3 w-100">
        <source
          :src="
            getPart2Data && getPart2Data.length > 0
              ? getPart2Data[0].LinkAudio
              : 'https://firebasestorage.googleapis.com/v0/b/test1-part2.appspot.com/o/part2%2Ftest1_part2.mp3?alt=media&token=f2de3b84-e7aa-43cb-82c8-d052b2f021c3'
          "
          type="audio/mp3"
        />
      </audio>
    </div>
    <div class="question-area mt-3 row">
      <div
        class="question col-3"
        v-bind:class="isFinished ? 'col-12' : 'col-3'"
        v-for="(item, index) in getPart2Data"
        :key="item.QuestionID"
      >
        <label for=""
          ><b
            >{{ index + 7 }}.
            <span v-if="isFinished">{{ item.Question }}</span></b
          ></label
        >
        <div class="option-area">
          <label
            v-on:click="autoSaveAnswer($event)"
            class="radio-inline mr-3"
            v-bind:class="isFinished ? 'd-block' : ''"
            ><input type="radio" :name="item.QuestionID" value="A" />&nbsp;A
            <span v-if="isFinished">. {{ item.OptionA }}</span>
          </label>
          <label
            v-on:click="autoSaveAnswer($event)"
            class="radio-inline mr-3"
            v-bind:class="isFinished ? 'd-block' : ''"
            ><input type="radio" :name="item.QuestionID" value="B" />&nbsp;B
            <span v-if="isFinished">. {{ item.OptionB }}</span>
          </label>
          <label
            v-on:click="autoSaveAnswer($event)"
            class="radio-inline mr-3"
            v-bind:class="isFinished ? 'd-block' : ''"
            ><input type="radio" :name="item.QuestionID" value="C" />&nbsp;C
            <span v-if="isFinished">. {{ item.OptionC }}</span>
          </label>
        </div>
      </div>
    </div>
    <button v-on:click="nextToPart3" class="btn h-btn-primary mb-4">
      Tiếp tục
    </button>
    <!--<button
      v-on:click="saveAnswerToLocalStorage(true)"
      class="btn h-btn-primary mb-4 ml-3"
    >
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
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART2_TITLE);
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
    // Lấy dữ liệu part 1
    this.getQuestionPart2();
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
        if (localStorage.getItem("part2Answer")) {
          var i = 0;
          var part2Answer = JSON.parse(localStorage.getItem("part2Answer"));
          this.$nextTick(function () {
            $.each($("#part2-detail .option-area"), function () {
              if (part2Answer[i]) {
                $.each($(this).find("input"), function () {
                  if ($(this).val() == part2Answer[i]) {
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
    /**
    Hàm thực hiện check câu nào đúng câu nào sai trên giao diện
    Author: LXHUNG(28/11/2020)
     */
    finish() {
      try {
        var me = this;
        this.isFinished = true;
        var index = 0;
        $.each($("#part2-detail .option-area"), function () {
          var vm = this;
          $.each($(vm).find("input"), function () {
            // Disable tất cả input
            $(this).prop("disabled", true);
            var input = this;
            if ($(this).val() == me.getPart2Data[index]?.Answer) {
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
        var part2Answer = [];
        $.each($("#part2-detail .option-area"), function () {
          if ($(this).find("input:checked").length > 0) {
            part2Answer.push($(this).find("input:checked").val());
          } else {
            part2Answer.push(null);
          }
        });
        localStorage.setItem("part2Answer", JSON.stringify(part2Answer));
        if (isShowMessage) this.showNoti('success', 'Ghi nhận câu trả lời thành công!');
      } catch (e) {
        console.log(e);
      }
    },
    // Chuyển sang làm part3
    nextToPart3() {
      try {
        // Lưu câu trả lời hiện tại vào localStorage
        this.saveAnswerToLocalStorage();
        this.$router.push(
          `/toeicexam/${this.selectedExam?.ExamID}/part3-instruction`
        );
      } catch (e) {
        console.log(e);
      }
    },
    // Lấy câu hỏi part2
    async getQuestionPart2() {
      try {
        if (this.getPart2Data && this.getPart2Data.length > 0) {
          return;
        }
        this.isShowLoading = true;
        var res = await this.$store.dispatch("toeicexam/getQuestionByPart", {
          part: "PART_2",
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
    ...mapGetters("toeicexam", ["getPart2Data"]),
  },
};
</script>
<style lang="scss" scoped></style>
