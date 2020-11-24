<template>
  <div>
    <div class="exam-header">
      <div class="left-content">
        <b>{{ getHeaderTitle }}</b>
      </div>
      <div class="right-content">
        <div class="item">TOEICExamOnline.pg</div>
        <div class="item">{{ countdown }}</div>
        <div class="item">☰</div>
        <div v-on:click="showWarningBeforeFinishExam" class="item">&#x2715;</div>
      </div>
    </div>
    <div class="exam-content">
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
      <img src="@/assets/icons/warning.png" class="wh-50p" alt="">
      <span>Bạn có muốn kết thúc và không ghi nhận kết quá bài thi?</span>
      <template slot="dialog-footer">
        <button v-on:click="isShowFinishDialog = false" type="submit" class="btn btn-light">
          Không
        </button>
        <button v-on:click="endExam" type="submit" class="btn h-btn-primary ml-3">
          Có
        </button>
      </template>
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Dialog from "@/components/Dialog.vue";
export default {
  created() {
    this.countDownTime();
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
    };
  },
  components: {
    Dialog,
  },
  methods: {
    endExam(){
      try {
        this.isShowFinishDialog = false;
        this.$router.push('/toeicexam');
      } catch(e){
        console.log(e);
      }
    },
    // Hàm hiển thị cảnh báo khi thoát bài thi
    showWarningBeforeFinishExam() {
      try {
        if (localStorage.getItem("timeEnd")) {
          this.isShowFinishDialog = true;
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
</style>
