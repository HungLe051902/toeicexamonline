<template>
  <div id="h-loading">
    <div class="w-100 h-100 d-flex justify-content-center align-items-center">
      <div class="loader"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#h-loading {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  display: none;
  opacity: 0.8;
  background-color: #fff;
  z-index: 99999;
  text-align: center;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #1864a3;
  border-bottom: 16px solid #1864a3;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>