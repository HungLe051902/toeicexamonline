<template>
  <div id="result">
    <div class="w-100 h-100 bg-light p-3">
      <h3>KẾT QUẢ</h3>
      <div v-if="result" class="">
        <div
          class="d-flex w-50 justify-content-between align-items-center mb-2"
          v-for="(item, index) in partData" :key="index"
        >
          <div class="d-flex">
            <div class="title">{{item.name}}:</div>
            <div>{{ item.currentPoint }}/{{item.maxPoint}}</div>
          </div>
          <button v-on:click="goToDetail(item.code)" class="btn h-btn-primary">Chi tiết</button>
        </div>
        <div class="w-50">
          <div class="container-fluid">
            <div class="row fs-18px">
              <div class="col-4 pl-0"><b>Điểm phần nghe:</b> {{listeningScore}}/495</div>
              <div class="col-4 pl-0"><b>Điểm phần đọc:</b> {{readingScore}}/495</div>
              <div class="col-4 pl-0"><b>Tổng điểm:</b> {{totalScore}}/990</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    // Lấy thông tin đề thi hiện tại
    this.selectedExam = JSON.parse(localStorage.getItem("selected-exam"));
    // Lấy thông tin kết quả trong localStorage
    this.result = localStorage.getItem("result")
      ? JSON.parse(localStorage.getItem("result"))
      : null;
    if (this.result){
      this.partData[0].currentPoint = this.result.part1Score;
      this.partData[1].currentPoint = this.result.part2Score;
      this.partData[2].currentPoint = this.result.part3Score;
      this.partData[3].currentPoint = this.result.part4Score;
      this.partData[4].currentPoint = this.result.part5Score;
      this.partData[5].currentPoint = this.result.part6Score;
      this.partData[6].currentPoint = this.result.part7Score;
    }
  },
  data() {
    return {
      result: null,
      partData: [
        {
          name: "PART I",
          code: "part1",
          currentPoint: 0,
          maxPoint: 6
        },
        {
          name: "PART II",
          code: "part2",
          currentPoint: 0,
          maxPoint: 25
        },
        {
          name: "PART III",
          code: "part3",
          currentPoint: 0,
          maxPoint: 39
        },
        {
          name: "PART IV",
          code: "part4",
          currentPoint: 0,
          maxPoint: 30
        },
        {
          name: "PART V",
          code: "part5",
          currentPoint: 0,
          maxPoint: 30
        },
        {
          name: "PART VI",
          code: "part6",
          currentPoint: 0,
          maxPoint: 16
        },
        {
          name: "PART VII",
          code: "part7",
          currentPoint: 0,
          maxPoint: 54
        },
      ],
      selectedExam: null
    };
  },
  methods: {
    goToDetail(partCode){
      try{
        this.$router.push(
          `/toeicexam/${this.selectedExam?.ExamID}/${partCode}-detail`
        );
      } catch(e){
        console.log(e);
      }
    }
  },
  computed: {
    listeningScore(){
      if (!this.result){
        return 0;
      }
      return Math.round(495*((this.result.part1Score + this.result.part2Score + this.result.part3Score + this.result.part4Score)/100));
    },
    readingScore(){
      if (!this.result){
        return 0;
      }
      return Math.round((this.result.part5Score + this.result.part6Score + this.result.part7Score)*(495/100));
    },
    totalScore(){
      return this.listeningScore + this.readingScore;
    }
  }
};
</script>
<style lang="scss">
#result {
  width: 100vw;
  height: 100vh;
  padding: 24px;
  background-color: #f0f0f0;
  .title {
    font-weight: bolder;
    width: 100px;
  }
}
</style>
