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
          <label class="radio mr-3" v-bind:class="isFinished ? 'd-block' : ''"
            ><input type="radio" :name="item.QuestionID" value="A" />&nbsp;A
            <span
              v-if="isFinished"
              v-bind:class="item.Answer == 'A' ? 'font-weight-bold' : ''"
              >. {{ item.OptionA }}</span
            ></label
          >
          <label class="radio mr-3" v-bind:class="isFinished ? 'd-block' : ''"
            ><input type="radio" :name="item.QuestionID" value="B" />&nbsp;B
            <span
              v-if="isFinished"
              v-bind:class="item.Answer == 'B' ? 'font-weight-bold' : ''"
              >. {{ item.OptionB }}</span
            ></label
          >
          <label class="radio mr-3" v-bind:class="isFinished ? 'd-block' : ''"
            ><input type="radio" :name="item.QuestionID" value="C" />&nbsp;C
            <span
              v-if="isFinished"
              v-bind:class="item.Answer == 'C' ? 'font-weight-bold' : ''"
              >. {{ item.OptionC }}</span
            ></label
          >
          <label class="radio" v-bind:class="isFinished ? 'd-block' : ''"
            ><input type="radio" :name="item.QuestionID" value="D" />&nbsp;D
            <span
              v-if="isFinished"
              v-bind:class="item.Answer == 'D' ? 'font-weight-bold' : ''"
              >. {{ item.OptionD }}</span
            ></label
          >
        </div>
      </div>
    </div>
    <button v-on:click="nextToPart2" class="btn h-btn-primary mb-4">
      Next
    </button>
    <button v-on:click="finish" class="btn h-btn-primary mb-4 ml-3">
      Chấm điểm
    </button>
  </div>
</template>
<script>
// import ToeicExamService from "@/services/toeicExamService.js";
import titleResource from "@/assets/resources/title.js";
import { mapGetters } from "vuex";
import $ from "jquery";
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
  async created() {
    // Đổi tiêu đề trên thanh header
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.PART1_TITLE);
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
    // Lấy dữ liệu part 1
    this.getQuestionPart1();
  },
  methods: {
    // test
    finish() {
      try {
        var me = this;
        this.isFinished = true;
        var index = 0;
        $.each($("#part1-detail .option-area"), function () {
          var vm = this;
          $.each($(vm).find("input"), function () {
            if ($(this).val() == me.getPart1Data[index]?.Answer) {
              $(this)
                .parent()
                .after("<span class='text-success'>Correct</span>");
            } else {
              if ($(this).is(":checked")) {
                $(this)
                  .parent()
                  .after("<span class='text-danger'>Wrong</span>");
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
        // var res = await ToeicExamService.getQuestionPart1ByYearAndExamNo(
        //   this.selectedExam?.Year,
        //   this.selectedExam?.ExamCode
        // );
        var res = await this.$store.dispatch("toeicexam/getQuestionByPart", {
          part: "PART_1",
          year: this.selectedExam?.Year,
          examNo: this.selectedExam?.ExamCode,
        });
        this.isShowLoading = false;
        // if (res) {
        //   if (res.data.APPCode == 200) {
        //     this.part1Data = res.data.Data;
        //   } else {
        //     this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
        //   }
        // } else {
        //   this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
        // }
        if (!res) {
          this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Chuyển sang phần 2
    nextToPart2() {
      try {
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
