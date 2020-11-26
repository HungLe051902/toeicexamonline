<template>
  <div id="result">
    <div class="w-100 h-100 bg-light p-3">
      <h3>KẾT QUẢ</h3>
      <div v-if="result" class="">
        <div
          class="d-flex w-50 justify-content-between align-items-center mb-2"
        >
          <div class="d-flex">
            <div class="title">PART I:</div>
            <div>{{ result.part1Score }}/6</div>
          </div>
          <button class="btn h-btn-primary">Chi tiết</button>
        </div>
        <div
          class="d-flex w-50 justify-content-between align-items-center mb-2"
        >
          <div class="d-flex">
            <div class="title">PART II:</div>
            <div>{{ result.part2Score }}/25</div>
          </div>
          <button class="btn h-btn-primary">Chi tiết</button>
        </div>
        <div
          class="d-flex w-50 justify-content-between align-items-center mb-2"
        >
          <div class="d-flex">
            <div class="title">PART III:</div>
            <div>{{ result.part3Score }}/39</div>
          </div>
          <button class="btn h-btn-primary">Chi tiết</button>
        </div>
        <div
          class="d-flex w-50 justify-content-between align-items-center mb-2"
        >
          <div class="d-flex">
            <div class="title">PART IV:</div>
            <div>{{ result.part4Score }}/30</div>
          </div>
          <button class="btn h-btn-primary">Chi tiết</button>
        </div>
        <div
          class="d-flex w-50 justify-content-between align-items-center mb-2"
        >
          <div class="d-flex">
            <div class="title">PART V:</div>
            <div>{{ result.part5Score }}/30</div>
          </div>
          <button class="btn h-btn-primary">Chi tiết</button>
        </div>
        <div
          class="d-flex w-50 justify-content-between align-items-center mb-2"
        >
          <div class="d-flex">
            <div class="title">PART VI:</div>
            <div>{{ result.part6Score }}/16</div>
          </div>
          <button class="btn h-btn-primary">Chi tiết</button>
        </div>
        <div
          class="d-flex w-50 justify-content-between align-items-center mb-2"
        >
          <div class="d-flex">
            <div class="title">PART VII:</div>
            <div>{{ result.part7Score }}/54</div>
          </div>
          <button class="btn h-btn-primary">Chi tiết</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    // Lấy thông tin kết quả trong localStorage
    this.result = localStorage.getItem("result")
      ? JSON.parse(localStorage.getItem("result"))
      : null;
  },
  data() {
    return {
      result: null,
    };
  },
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
