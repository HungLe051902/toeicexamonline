<template>
  <div>
    <div class="exam-header">
      <div class="left-content">
        <b>TOEICExamOnline.pg</b>
      </div>
      <div class="right-content">
        <div class="item">TOEICExamOnline.pg</div>
        <div class="item">02:00:00</div>
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
export default {};
</script>
<style lang="scss" scoped>
.exam-header {
  position: fixed;
  width: 100vw;
  height: 50px;
  background-color: #FFFFFF;
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
        color: #FFFFFF;
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
  .container-fluid{
      background-color: #FFFFFF;
      height: 100%;
      overflow: auto;
      padding: 16px;
  }
}
</style>