<template>
  <div id="part7-detail" v-loading="isShowLoading">
    <h5>Part VII: Reading Comprehension</h5>
    <div class="list-question">
      <div
        class="group-question mb-5"
        v-for="(item) in getPart7Data"
        :key="item.QuestionID"
      >
        <label for=""><b>Question {{showRangeQuestion(item)}} refer to following paragraph:</b></label>
        <img :src="item.LinkImg" alt="">
        <div class="question">
          <label for=""><b>{{item.StartNumber}}. {{item.FirstQuestion}}</b></label>
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
        <div class="question">
          <label for=""><b>{{item.StartNumber + 1}}. {{item.SecondQuestion}}</b></label>
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
        <div class="question" v-if="calculateRangeQuestion(item) >= 3">
          <label for=""><b>{{item.StartNumber + 2}}. {{item.ThirdQuestion}}</b></label>
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
        <div class="question" v-if="calculateRangeQuestion(item) >= 4">
          <label for=""><b>{{item.StartNumber + 3}}. {{item.FourthQuestion}}</b></label>
          <div class="options">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'fourth'"
                  />A. {{ item.FourthOptionA }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'fourth'"
                  />B. {{ item.FourthOptionB }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'fourth'"
                  />C. {{ item.FourthOptionC }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'fourth'"
                  />D. {{ item.FourthOptionD }}
                </label>
              </div>
            </div>
        </div>
        <div class="question" v-if="calculateRangeQuestion(item) >= 5">
          <label for=""><b>{{item.StartNumber + 4}}. {{item.FifthQuestion}}</b></label>
          <div class="options">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'fifth'"
                  />A. {{ item.FifthOptionA }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'fifth'"
                  />B. {{ item.FifthOptionB }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'fifth'"
                  />C. {{ item.FifthOptionC }}
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    :name="item.GroupQuestionID + 'fifth'"
                  />D. {{ item.FifthOptionD }}
                </label>
              </div>
            </div>
        </div>
      </div>
    </div>
    <button v-on:click="done" class="btn h-btn-primary mb-4">Hoàn thành</button>
  </div>
</template>
<script>
import titleResource from "@/assets/resources/title.js";
import { mapGetters } from "vuex";
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
  methods: {
    // Hiển thị phạm vi câu hỏi
    showRangeQuestion(item){
      try {
        var range = this.calculateRangeQuestion(item);
        return `${item.StartNumber} - ${item.StartNumber + range - 1}`;
      } catch(e){
        console.log(e);
      }
    },
    // Tính phạm vi câu hỏi
    calculateRangeQuestion(item){
      try{
        return 2 + (typeof(item.ThirdQuestion) != "object" ? 1 : 0) + (typeof(item.FourthQuestion) != "object" ? 1 : 0) + (typeof(item.FifthQuestion) != "object" ? 1 : 0);
      } catch(e){
        console.log(e);
      }
    },
    // Nộp bài
    done() {
      try {
        // this.$router.push(
        //   `/toeicexam/${this.selectedExam?.ExamID}/part6-instruction`
        // );
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
        }
        // this.isShowLoading = true;
        // var res = await ToeicExamService.getQuestionPart7ByYearAndExamNo(
        //   this.selectedExam?.Year,
        //   this.selectedExam?.ExamCode
        // );
        // this.isShowLoading = false;
        // if (res) {
        //   if (res.data.APPCode == 200) {
        //     this.part7Data = res.data.Data;
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
    ...mapGetters("toeicexam", ["getPart7Data"]),
  }
};
</script>
<style lang="scss" scoped>
</style>