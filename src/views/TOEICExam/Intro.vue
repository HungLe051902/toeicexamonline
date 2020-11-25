<template>
  <div>
    <div class="exam-header">
      <div class="left-content">
        <b>{{ getHeaderTitle }}</b>
      </div>
      <div class="right-content">
        <div class="item">TOEICExamOnline.pg</div>
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
            v-for="item in readingPartData"
            :key="item.partCode"
            v-on:click="goToPart(item)"
          >
            <div><b>{{item.partName}}</b></div>
            <div>{{item.description}}</div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Dialog from "@/components/Dialog.vue";
import $ from "jquery";
export default {
  created() {
    this.countDownTime();
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
      selectedExam: null,
      listeningPartData: [
        {
          partCode: 1,
          partName: "Part I",
          description: "Reading Comprehension",
        },
        {
          partCode: 2,
          partName: "Part II",
          description: "Question - Response",
        },
        {
          partCode: 3,
          partName: "Part III",
          description: "Short Conversations",
        },
        {
          partCode: 4,
          partName: "Part IV",
          description: "Short Talks",
        },
      ],
      readingPartData: [
        {
          partCode: 5,
          partName: "Part V",
          description: "Incomplete Sentences",
        },
        {
          partCode: 6,
          partName: "Part VI",
          description: "Text Completion",
        },
        {
          partCode: 7,
          partName: "Part VII",
          description: "Reading Comprehension",
        },
      ],
    };
  },
  components: {
    Dialog,
  },
  methods: {
    // Hàm chuyển tới từng phần trong đề thi
    goToPart(item){
      try{
        this.toggleSideBar();
        this.$router.push(`/toeicexam/${this.selectedExam?.ExamID}/part${item.partCode}-detail`)
      } catch(e){
        console.log(e);
      }
    },
    // Hàm mở/đóng sidebar
    toggleSideBar() {
      try {
        if ($(".sidebar").css("display") == "none")
          $(".sidebar").css("display", "block");
        else $(".sidebar").css("display", "none");
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
          this.showNoti("info", "Bạn chưa bắt đầu làm bài!");
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
              localStorage.removeItem("timeEnd");
              vm.countdown = "00:00:00";
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
    });
    // this.countdown = localStorage.getItem("timeEnd");
  },
  computed: {
    ...mapGetters("toeicexam", ["getHeaderTitle"]),
    isStarted() {
      return localStorage.getItem("timeEnd");
    },
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
    width: 300px;
    background-color: #ffffff;
    border-left: 1px solid #1864a3;
    display: none;
    overflow-y: auto;
    z-index: 100;
    -webkit-animation: slide-down 0.3s ease-in-out;
    -moz-animation: slide-down 0.3s ease-in-out;
    .part {
      border-bottom: 1px solid #1864a3;
      padding: 16px;
      padding-left: 24px;
      &:hover {
        cursor: pointer;
        background-color: rgb(247, 241, 241);
      }
    }
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
