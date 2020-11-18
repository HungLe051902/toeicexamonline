<template>
  <div id="instruction">
    <div class="mb-3">
      <p class="mb-2">
        <b>{{ selectedExam ? selectedExam.ExamName : "---" }} - ETS 2020</b>
      </p>
      <p class="mb-2">Thời gian làm bài: 120 phút</p>
      <p class="mb-2">Nghe: 45 phút</p>
      <p class="mb-2">Đọc: 75 phút</p>
    </div>
    <button v-on:click="start" class="btn h-btn-primary">Bắt đầu</button>
  </div>
</template>
<script>
import titleResource from "@/assets/resources/title.js";
// import EventBus from "@/EventBus.js";
export default {
  methods: {
    start() {
      try {
        // Lưu thông tin thời gian bắt đầu làm + thêm 2h
        if (!localStorage.getItem("timeEnd"))
          localStorage.setItem(
            "timeEnd",
            new Date().getTime() + 2 * 60 * 60 * 1000
          );
        // Chuyển tới trang hướng dẫn part1
        this.$router.push(`/toeicexam/${this.selectedExam.ExamID}/part1-instruction`);
        // Thông báo sự kiện để đếm ngược thời gian làm bài
        this.$eventBus.$emit("countdown");
      } catch (e) {
        console.log(e);
      }
    },
  },
  data() {
    return {
      selectedExam: null,
    };
  },
  created() {
    // Đặt lại tiêu đề header
    this.$store.commit("toeicexam/setHeaderTitle", titleResource.MAIN_TITLE);
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
  },
};
</script>
<style lang="scss" scoped>
#instruction {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>