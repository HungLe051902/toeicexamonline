<template>
  <div id="part1-instruction">
    <p class="title"><b>Part I: Picture Description</b></p>
    <p>
      <b>Directions:</b> For each question, you will see a picture and you will
      hear four short statements. The statements will be spoken just one time.
      They will not be printed in your test book so you must listen carefully to
      understand what the speaker says. When you hear the four statements, look
      at the picture and choose the statement that best describes what you see
      in the picture. Choose the best answer A, B, C or D
    </p>
    <img src="@/assets/img/part_1_instruction.png" alt="" />
    <audio controls class="d-block mt-3">
      <source
        src="https://toeic24.vn/upload/audio/part_i_intro.mp3"
        type="audio/mp3"
      />
    </audio>
    <div class="example-answer mt-3">
      <p><b>EXAMPLE:</b></p>
      <p class="mb-0">Now listen to the four statements.</p>
      <p class="mb-0">
        Statement (D) best describes what you see in the picture.
      </p>
      <p>Therefore, you should choose answer (D).</p>
      <div class="radio">
        <label
          ><input type="radio" name="example" disabled />&nbsp;&nbsp;&nbsp;A. He is on the
          phone</label
        >
      </div>
      <div class="radio">
        <label
          ><input type="radio" name="example" disabled />&nbsp;&nbsp;&nbsp;B. She is driving the car</label
        >
      </div>
      <div class="radio">
        <label
          ><input type="radio" name="example" disabled />&nbsp;&nbsp;&nbsp;C. She is typing on the
          computer</label
        >
      </div>
      <div class="radio">
        <label
          ><input type="radio" name="example" checked/>&nbsp;&nbsp;&nbsp;D. He is sitting next to
          her</label
        >
      </div>
      <button v-on:click="start" class="btn h-btn-primary">Bắt đầu</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    start(){
      try{
        // Lấy thông giờ hiện tại + thêm 2 h để countdown

        var examID = JSON.parse(localStorage.getItem("selected-exam"))?.ExamID;
        this.$router.push(`/toeicexam/${examID}/part1-detail`);
      } catch(e){
        console.log(e);
      }
    }
  },
};
  
</script>
<style lang="scss" scoped>
#part1-instruction {
  padding: 0 100px;
}
</style>