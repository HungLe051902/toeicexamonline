<template>
  <div>
    <div class="exam-header">
      <div class="left-content">
        <b>{{ getHeaderTitle }}</b>
      </div>
      <div class="right-content">
        <div v-if="isFinishExam" v-on:click="goToView('/result')" class="item h-btn-primary">Kết quả</div>
        <div v-on:click="showConfirmBeforeSubmit" class="item">
          {{ completeExamText }}
        </div>
        <div class="item">{{ countdown }}</div>
        <div v-on:click="toggleSideBar" class="item">☰</div>
        <div v-on:click="showWarningBeforeFinishExam" class="item">
          &#x2715;
        </div>
      </div>
    </div>
    <div class="exam-content">
      <div class="sidebar h-100">
        <div class="listening-section">
          <div class="title p-2 h-btn-primary">LISTENING TEST</div>
          <div
            class="part"
            v-bind:class="currentPart == item.partCode ? 'part-selected' : ''"
            v-for="item in listeningPartData"
            :key="item.partCode"
            v-on:click="goToPart(item)"
          >
            <div>
              <b>{{ item.partName }}</b>
            </div>
            <div>{{ item.description }}</div>
          </div>
        </div>
        <div class="reading-section">
          <div class="title p-2 h-btn-primary">READING TEST</div>
          <div
            class="part"
            v-bind:class="currentPart == item.partCode ? 'part-selected' : ''"
            v-for="item in readingPartData"
            :key="item.partCode"
            v-on:click="goToPart(item)"
          >
            <div>
              <b>{{ item.partName }}</b>
            </div>
            <div>{{ item.description }}</div>
          </div>
        </div>
      </div>
      <div id="exam-section" class="container-fluid">
        <div class="content h-100">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Dialog
      title="Thông báo"
      :dialogVisible="isShowFinishDialog"
      @closeDialog="isShowFinishDialog = false"
    >
      <img src="@/assets/icons/warning.png" class="wh-50p" alt="" />
      <span>Bạn có muốn kết thúc và không ghi nhận kết quá bài thi?</span>
      <template slot="dialog-footer">
        <button
          v-on:click="isShowFinishDialog = false"
          type="submit"
          class="btn btn-light"
        >
          Không
        </button>
        <button
          v-on:click="endExam"
          type="submit"
          class="btn h-btn-primary ml-3"
        >
          Có
        </button>
      </template>
    </Dialog>
    <Dialog
      title="Thông báo"
      widthDialog="500px"
      :dialogVisible="isShowConfirmBeforeSubmit"
      @closeDialog="isShowConfirmBeforeSubmit = false"
    >
      <img src="@/assets/icons/warning.png" class="wh-50p" alt="" />
      <span>Vẫn còn thời gian làm bài, bạn có chắc chắn muốn nộp bài?</span>
      <template slot="dialog-footer">
        <button
          v-on:click="isShowConfirmBeforeSubmit = false"
          type="submit"
          class="btn btn-light"
        >
          Không
        </button>
        <button
          v-on:click="submitExam"
          type="submit"
          class="btn h-btn-primary ml-3"
        >
          Có
        </button>
      </template>
    </Dialog>
    <Dialog
      title="Thông báo"
      widthDialog="500px"
      :dialogVisible="isShowTimeupPopup"
      @closeDialog="isShowTimeupPopup = false"
    >
      <span>Đã hết thời gian làm bài!</span>
      <template slot="dialog-footer">
        <button
          v-on:click="goToView('/toeicexam')"
          type="submit"
          class="btn btn-light"
        >
          Làm bài khác
        </button>
        <button
          v-on:click="submitExam"
          type="submit"
          class="btn h-btn-primary ml-3"
        >
          Xem kết quả
        </button>
      </template>
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Dialog from "@/components/Dialog.vue";
import $ from "jquery";
export default {
  created() {
    if (localStorage.getItem("timeEnd")) {
      this.countDownTime();
      this.completeExamText = "NỘP BÀI";
    }
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
  },
  watch: {
    isStarted(val) {
      console.log("isStarted", val);
    },
  },
  data() {
    return {
      countdown: "02:00:00",
      isShowFinishDialog: false,
      isShowConfirmBeforeSubmit: false,
      selectedExam: null,
      completeExamText: "TOEICExamOnline.pg",
      listeningPartData: [
        {
          partCode: 'part1',
          partName: "Part I",
          description: "Reading Comprehension",
        },
        {
          partCode: 'part2',
          partName: "Part II",
          description: "Question - Response",
        },
        {
          partCode: 'part3',
          partName: "Part III",
          description: "Short Conversations",
        },
        {
          partCode: 'part4',
          partName: "Part IV",
          description: "Short Talks",
        },
      ],
      readingPartData: [
        {
          partCode: 'part5',
          partName: "Part V",
          description: "Incomplete Sentences",
        },
        {
          partCode: 'part6',
          partName: "Part VI",
          description: "Text Completion",
        },
        {
          partCode: 'part7',
          partName: "Part VII",
          description: "Reading Comprehension",
        },
      ],
      isShowTimeupPopup: false
    };
  },
  components: {
    Dialog,
  },
  methods: {
    /**
    Hàm điều hướng tới trang hiển thị kết quả
    Author: LXHUNG(28/11/2020)
     */
    goToView(route){
      try{
        if (route)
          this.$router.push(route);
      } catch(e){
        console.log(e);
      }
    },
    /**
    Hàm hiển thị thông báo xác nhận trước khi nộp bài
    Author: LXHUNG(28/11/2020)
     */
    showConfirmBeforeSubmit() {
      try {
        if (!localStorage.getItem("timeEnd")) return;
        this.isShowConfirmBeforeSubmit = true;
      } catch (e) {
        console.log(e);
      }
    },
    /**
    Tính điểm part1
    Author: LXHUNG(28/11/2020)
     */
    async calculatePart1Score() {
      try {
        var part1Score = 0;
        var part1Answer = JSON.parse(localStorage.getItem("part1Answer"));
        if (part1Answer) {
          if (this.getPart1Data.length <= 0) {
            await this.$store.dispatch("toeicexam/getQuestionByPart", {
              part: "PART_1",
              year: this.selectedExam?.Year,
              examNo: this.selectedExam?.ExamCode,
            });
          }
          for (let i = 0; i < this.getPart1Data.length; i++) {
            if (part1Answer[i] && this.getPart1Data[i].Answer == part1Answer[i])
              part1Score++;
          }
        }
        return part1Score;
      } catch (e) {
        console.log(e);
      }
    },
    /**
    Tính điểm part2
     */
    async calculatePart2Score() {
      try {
        var part2Score = 0;
        var part2Answer = JSON.parse(localStorage.getItem("part2Answer"));
        if (part2Answer) {
          if (this.getPart2Data.length <= 0) {
            await this.$store.dispatch("toeicexam/getQuestionByPart", {
              part: "PART_2",
              year: this.selectedExam?.Year,
              examNo: this.selectedExam?.ExamCode,
            });
          }
          for (let i = 0; i < this.getPart2Data.length; i++) {
            if (part2Answer[i] && this.getPart2Data[i].Answer == part2Answer[i])
              part2Score++;
          }
        }
        return part2Score;
      } catch (e) {
        console.log(e);
      }
    },
    /**
    Tính điểm part3
     */
    async calculatePart3Score() {
      try {
        var part3Score = 0;
        var part3Answer = JSON.parse(localStorage.getItem("part3Answer"));
        if (part3Answer) {
          if (this.getPart3Data.length <= 0) {
            await this.$store.dispatch("toeicexam/getQuestionByPart", {
              part: "PART_3",
              year: this.selectedExam?.Year,
              examNo: this.selectedExam?.ExamCode,
            });
          }
          for (let i = 0; i < this.getPart3Data.length; i++) {
            if (
              part3Answer[i].FirstAnswer &&
              this.getPart3Data[i].FirstAnswer == part3Answer[i].FirstAnswer
            )
              part3Score++;
            if (
              part3Answer[i].SecondAnswer &&
              this.getPart3Data[i].SecondAnswer == part3Answer[i].SecondAnswer
            )
              part3Score++;
            if (
              part3Answer[i].ThirdAnswer &&
              this.getPart3Data[i].ThirdAnswer == part3Answer[i].ThirdAnswer
            )
              part3Score++;
          }
        }
        return part3Score;
      } catch (e) {
        console.log(e);
      }
    },
    /**
    Tính điểm part4
     */
    async calculatePart4Score() {
      try {
        var part4Score = 0;
        var part4Answer = JSON.parse(localStorage.getItem("part4Answer"));
        if (part4Answer) {
          if (this.getPart4Data.length <= 0) {
            await this.$store.dispatch("toeicexam/getQuestionByPart", {
              part: "PART_4",
              year: this.selectedExam?.Year,
              examNo: this.selectedExam?.ExamCode,
            });
          }
          for (let i = 0; i < this.getPart4Data.length; i++) {
            if (
              part4Answer[i].FirstAnswer &&
              this.getPart4Data[i].FirstAnswer == part4Answer[i].FirstAnswer
            )
              part4Score++;
            if (
              part4Answer[i].SecondAnswer &&
              this.getPart4Data[i].SecondAnswer == part4Answer[i].SecondAnswer
            )
              part4Score++;
            if (
              part4Answer[i].ThirdAnswer &&
              this.getPart4Data[i].ThirdAnswer == part4Answer[i].ThirdAnswer
            )
              part4Score++;
          }
        }
        return part4Score;
      } catch (e) {
        console.log(e);
      }
    },
    /**
    Tính điểm part5
     */
    async calculatePart5Score() {
      try {
        var part5Score = 0;
        var part5Answer = JSON.parse(localStorage.getItem("part5Answer"));
        if (part5Answer) {
          if (this.getPart5Data.length <= 0) {
            await this.$store.dispatch("toeicexam/getQuestionByPart", {
              part: "PART_5",
              year: this.selectedExam?.Year,
              examNo: this.selectedExam?.ExamCode,
            });
          }
          for (let i = 0; i < this.getPart5Data.length; i++) {
            if (part5Answer[i] && this.getPart5Data[i].Answer == part5Answer[i])
              part5Score++;
          }
        }
        return part5Score;
      } catch (e) {
        console.log(e);
      }
    },
    /**
    Tính điểm part6
     */
    async calculatePart6Score() {
      try {
        let part6Score = 0;
        let part6Answer = JSON.parse(localStorage.getItem("part6Answer"));
        if (part6Answer) {
          if (this.getPart6Data.length <= 0) {
            await this.$store.dispatch("toeicexam/getQuestionByPart", {
              part: "PART_6",
              year: this.selectedExam?.Year,
              examNo: this.selectedExam?.ExamCode,
            });
          }
          for (let i = 0; i < this.getPart6Data.length; i++) {
            if (
              part6Answer[i].FirstAnswer &&
              this.getPart6Data[i].FirstAnswer == part6Answer[i].FirstAnswer
            )
              part6Score++;
            if (
              part6Answer[i].SecondAnswer &&
              this.getPart6Data[i].SecondAnswer == part6Answer[i].SecondAnswer
            )
              part6Score++;
            if (
              part6Answer[i].ThirdAnswer &&
              this.getPart6Data[i].ThirdAnswer == part6Answer[i].ThirdAnswer
            )
              part6Score++;
            if (
              part6Answer[i].FourthAnswer &&
              this.getPart6Data[i].FourthAnswer == part6Answer[i].FourthAnswer
            )
              part6Score++;
          }
        }
        return part6Score;
      } catch (e) {
        console.log(e);
      }
    },
    /**
    Tính điểm part7
     */
    async calculatePart7Score() {
      try {
        let part7Score = 0;
        let part7Answer = JSON.parse(localStorage.getItem("part7Answer"));
        if (part7Answer) {
          if (this.getPart7Data.length <= 0) {
            await this.$store.dispatch("toeicexam/getQuestionByPart", {
              part: "PART_7",
              year: this.selectedExam?.Year,
              examNo: this.selectedExam?.ExamCode,
            });
          }
          for (let i = 0; i < this.getPart7Data.length; i++) {
            if (
              part7Answer[i].FirstAnswer &&
              this.getPart7Data[i].FirstAnswer == part7Answer[i].FirstAnswer
            )
              part7Score++;
            if (
              part7Answer[i].SecondAnswer &&
              this.getPart7Data[i].SecondAnswer == part7Answer[i].SecondAnswer
            )
              part7Score++;
            if (
              part7Answer[i].ThirdAnswer &&
              this.getPart7Data[i].ThirdAnswer == part7Answer[i].ThirdAnswer
            )
              part7Score++;
            if (
              part7Answer[i].FourthAnswer &&
              this.getPart7Data[i].FourthAnswer == part7Answer[i].FourthAnswer
            )
              part7Score++;
            if (
              part7Answer[i].FifthAnswer &&
              this.getPart7Data[i].FifthAnswer == part7Answer[i].FifthAnswer
            )
              part7Score++;
          }
        }
        return part7Score;
      } catch (e) {
        console.log(e);
      }
    },
    /**
    Nộp bài
     */
    async submitExam() {
      try {
        // Khi nộp bài thì xóa thời gian kết thúc bài làm
        localStorage.removeItem("timeEnd");
        // Chuyển trạng thái làm bài
        localStorage.setItem("state", "finished");
        this.showLoading();
        this.isShowConfirmBeforeSubmit = false;
        // Tính điểm listening
        let part1Score = await this.calculatePart1Score();
        let part2Score = await this.calculatePart2Score();
        let part3Score = await this.calculatePart3Score();
        let part4Score = await this.calculatePart4Score();
        // Tính điểm reading
        let part5Score = await this.calculatePart5Score();
        let part6Score = await this.calculatePart6Score();
        let part7Score = await this.calculatePart7Score();

        //Lưu kết quả vào localStorage
        let result = {
          part1Score: part1Score,
          part2Score: part2Score,
          part3Score: part3Score,
          part4Score: part4Score,
          part5Score: part5Score,
          part6Score: part6Score,
          part7Score: part7Score,
        };
        localStorage.setItem("result", JSON.stringify(result));
        this.hideLoading();
        this.$router.push("/result");
      } catch (e) {
        console.log(e);
      }
    },
    // Hàm chuyển tới từng phần trong đề thi
    goToPart(item) {
      try {
        if (localStorage.getItem("state") != "beforeDoing") {
          this.toggleSideBar();
          this.$router.push(
            `/toeicexam/${this.selectedExam?.ExamID}/${item.partCode}-detail`
          );
        } else {
          this.toggleSideBar();
          this.showNoti("info", "Bạn chưa bắt đầu bài thi!");
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Hàm mở/đóng sidebar
    toggleSideBar() {
      try {
        // if ($(".sidebar").css("display") == "none")
        //   $(".sidebar").css("display", "block");
        // else $(".sidebar").css("display", "none");
        $(".sidebar").toggleClass("show-sidebar");
      } catch (e) {
        console.log(e);
      }
    },
    // Kết thúc bài thi
    endExam() {
      try {
        this.isShowFinishDialog = false;
        this.$router.push("/toeicexam");
        localStorage.clear();
      } catch (e) {
        console.log(e);
      }
    },
    // Hàm hiển thị cảnh báo khi thoát bài thi
    showWarningBeforeFinishExam() {
      try {
        if (localStorage.getItem("timeEnd")) {
          this.isShowFinishDialog = true;
        } else {
          this.$router.push("/toeicexam");
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Hàm đếm ngược thời gian làm bài
    countDownTime() {
      try {
        var vm = this;
        if (localStorage.getItem("timeEnd")) {
          var timeEnd = parseInt(localStorage.getItem("timeEnd"));
          // Update the count down every 1 second
          var x = setInterval(function () {
            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = timeEnd - now;

            // Time calculations for hours, minutes and seconds
            var hours = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            var minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            vm.countdown =
              (hours < 10 ? "0" + hours : hours) +
              ":" +
              (minutes < 10 ? "0" + minutes : minutes) +
              ":" +
              (seconds < 10 ? "0" + seconds : seconds);

            // If the count down is over, write some text
            if (distance < 0) {
              clearInterval(x);
              vm.countdown = "00:00:00";
              // Hiển thị popup khi hết thời gian
              vm.isShowTimeupPopup = true;
            }
          }, 1);
        } else {
          this.countdown = "02:00:00";
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    var vm = this;
    // Đếm ngược thời gian làm bài
    this.$eventBus.$on("countdown", function () {
      vm.countDownTime();
      vm.completeExamText = "NỘP BÀI";
    });
    this.$eventBus.$on("submit", function () {
      vm.submitExam();
    });

    if (localStorage.getItem("state") == "finished")
      this.countdown = "00:00:00";

    // Lắng nghe sự kiện click ra ngoài sidebar thì ẩn sidebar
    $('#exam-section').mouseup(function (e) {
      if (
        !$(".sidebar").is(e.target) &&
        $(".sidebar").has(e.target).length === 0
      ) {
        $(".sidebar").removeClass("show-sidebar");
      }
    });
  },
  computed: {
    ...mapGetters("toeicexam", [
      "getHeaderTitle",
      "getPart1Data",
      "getPart2Data",
      "getPart3Data",
      "getPart4Data",
      "getPart5Data",
      "getPart6Data",
      "getPart7Data",
    ]),
    isStarted() {
      return localStorage.getItem("timeEnd");
    },
    isFinishExam(){
      return localStorage.getItem('state') == 'finished';
    },
    currentPart(){
      return this.$route.meta.partCode;
    }
  },
};
</script>
<style lang="scss" scoped>
.exam-header {
  position: fixed;
  width: 100vw;
  height: 50px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 0 0 24px;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  .right-content {
    display: flex;
    height: 100%;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      background-color: #f0f0f0;
      padding: 0 16px;
      border-left: 1px solid #ccc3c3;
      border-bottom: 1px solid #ccc3c3;
      &:hover {
        cursor: pointer;
        background-color: #ccc3c3;
        color: #ffffff;
      }
    }
  }
}
.exam-content {
  .sidebar {
    width: 200px;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    background-color: #ffffff;
    border-left: 1px solid #1864a3;
    overflow-y: auto;
    z-index: 100;
    transition: width 1s;
    // -webkit-animation: slide-down 0.3s ease-in-out;
    // -moz-animation: slide-down 0.3s ease-in-out;
    .part {
      border-bottom: 1px solid #1864a3;
      padding: 16px;
      padding-left: 24px;
      &:hover {
        cursor: pointer;
        background-color: rgb(247, 241, 241);
        color: #000000;
      }
    }
    .part-selected{
      background-color: gray;
      color: #FFFFFF;
    }
  }

  .show-sidebar {
    width: 300px;
  }

  background-color: #f0f0f0;
  position: absolute;
  margin-top: 50px;
  height: calc(100vh - 50px);
  width: 100vw;
  padding: 24px;
  .container-fluid {
    background-color: #ffffff;
    height: 100%;
    width: 100%;
    overflow: auto;
    padding: 16px;
    .content {
      width: 600px;
      margin: auto;
    }
  }
}

@-webkit-keyframes slide-down {
  0% {
    opacity: 0;
    -webkit-transform: translateX(100%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
  }
}
@-moz-keyframes slide-down {
  0% {
    opacity: 0;
    -moz-transform: translateX(100%);
  }
  100% {
    opacity: 1;
    -moz-transform: translateX(0);
  }
}
</style>
