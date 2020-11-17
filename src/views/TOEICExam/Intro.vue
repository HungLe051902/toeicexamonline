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
        <div class="item">&#x2715;</div>
      </div>
    </div>
    <div class="exam-content">
      <div class="container-fluid">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from '@/EventBus.js'
import { mapGetters } from "vuex";
export default {
  watch: {
    isStarted(val){
      console.log('isStarted', val);
    }
  },
  data() {
    return {
      countdown: "02:00:00",
    };
  },
  mounted() {
    var vm = this;
    // Đếm ngược thời gian làm bài
    // var timeEnd = parseIlocalStorage.getItem('timeEnd');
    EventBus.$on('abc', function(){
      console.log("vào");
    })
    this.countdown = localStorage.getItem("timeEnd");
    if (localStorage.getItem("timeEnd")) {
      this.countdown = "hahaha";
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
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
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
  },
  computed: {
    ...mapGetters("toeicexam", ["getHeaderTitle"]),
    isStarted(){
      return localStorage.getItem("timeEnd");
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
  }
}
</style>
