<template>
  <div id="part1-detail" v-loading="isShowLoading">
    <h5>Part I: Picture Description</h5>
    <div class="question-area">
      <div v-for="(item, index) in getPart1Data" :key="item.QuestionID">
        <label for=""
          ><b>{{ index + 1 }}. {{ item.Title }}</b></label
        >
        <audio controls class="d-block mt-3 w-100">
          <source :src="item.LinkAudio" type="audio/mp3" />
        </audio>

        <img :src="item.LinkImg" class="w-100 my-3" alt="" />
        <div class="option-area">
          <label v-on:click="autoSaveAnswer($event)" class="radio mr-3" v-bind:class="isFinished ? 'd-block' : ''"
            ><input type="radio" :name="item.QuestionID" value="A" />&nbsp;A
            <span v-if="isFinished">. {{ item.OptionA }}</span></label
          >
          <label v-on:click="autoSaveAnswer($event)" class="radio mr-3" v-bind:class="isFinished ? 'd-block' : ''"
            ><input type="radio" :name="item.QuestionID" value="B" />&nbsp;B
            <span v-if="isFinished">. {{ item.OptionB }}</span></label
          >
          <label v-on:click="autoSaveAnswer($event)" class="radio mr-3" v-bind:class="isFinished ? 'd-block' : ''"
            ><input type="radio" :name="item.QuestionID" value="C" />&nbsp;C
            <span v-if="isFinished">. {{ item.OptionC }}</span></label
          >
          <label v-on:click="autoSaveAnswer($event)" class="radio" v-bind:class="isFinished ? 'd-block' : ''"
            ><input type="radio" :name="item.QuestionID" value="D" />&nbsp;D
            <span v-if="isFinished">. {{ item.OptionD }}</span></label
          >
        </div>
      </div>
    </div>
    <button v-on:click="nextToPart2" class="btn h-btn-primary mb-4">
      Tiếp tục
    </button>
    <!--<button
      v-on:click="saveAnswerToLocalStorage"
      class="btn h-btn-primary mb-4 ml-3"
    >
      Ghi nhận câu trả lời
    </button>-->
  </div>
</template>
<script>
// import ToeicExamService from "@/services/toeicExamService.js";
import titleResource from "@/assets/resources/title.js";
import { mapGetters } from "vuex";
import $ from "jquery";
import toeicExamMixin from "@/mixins/toeicexam.vue";
export default {
  data() {
    return {
      selectedExam: null,
      // part1Data: null,
      isShowLoading: false,
      isFinished: false,
    };
  },
  props: {},
  mixins: [toeicExamMixin],
  async created() {
    // Đổi tiêu đề trên thanh header
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART1_TITLE);
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
    // Lấy dữ liệu part 1
    this.getQuestionPart1();
  },
  mounted() {
    this.handleAfterLoadData();
    // this.$nextTick
    // $(document).ready(function(){
    //   $()
    // })
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
          this.$nextTick(function () {
            vm.finish();
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Hàm hiển thị lại câu trả lời của người dùng
    bindingAnswer() {
      try {
        if (localStorage.getItem("part1Answer")) {
          var i = 0;
          var part1Answer = JSON.parse(localStorage.getItem("part1Answer"));
          this.$nextTick(function () {
            $.each($("#part1-detail .option-area"), function () {
              if (part1Answer[i]) {
                $.each($(this).find("input"), function () {
                  if ($(this).val() == part1Answer[i]) {
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
        $.each($("#part1-detail .option-area"), function () {
          var vm = this;
          $.each($(vm).find("input"), function () {
            // Disable tất cả input
            $(this).prop("disabled", true);
            var input = this;
            if ($(this).val() == me.getPart1Data[index]?.Answer) {
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
          return;
        }
        this.handleAfterLoadData();
      } catch (e) {
        console.log(e);
      }
    },
    /**
      Lưu các câu trả lời vào local storage
     */
    saveAnswerToLocalStorage(isShowMessage) {
      try {
        var part1Answer = [];
        $.each($("#part1-detail .option-area"), function () {
          if ($(this).find("input:checked").length > 0) {
            part1Answer.push($(this).find("input:checked").val());
          } else {
            part1Answer.push(null);
          }
        });
        localStorage.setItem("part1Answer", JSON.stringify(part1Answer));
        if (isShowMessage)
          this.showNoti("success", "Ghi nhận câu trả lời thành công!");
      } catch (e) {
        console.log(e);
      }
    },
    // Chuyển sang phần 2
    nextToPart2() {
      try {
        // Lưu câu trả lời hiện tại vào localStorage
        this.saveAnswerToLocalStorage();
        this.$router.push(
          `/toeicexam/${this.selectedExam?.ExamID}/part2-instruction`
        );
      } catch (e) {
        console.log(e);
      }
    },
  },

  computed: {
    ...mapGetters("toeicexam", ["getPart1Data"]),
  },
};
</script>
<style lang="scss" scoped>
#part1-detail {
  height: 100%;
  width: 600px;
  max-width: 800px;
  margin: auto;
}
</style>
