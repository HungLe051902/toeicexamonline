<template>
  <div id="footer">
    <div class="footer-content container p-3">
      <div class="row">
        <div class="col-6">
          <p class="mb-0">FOOTER CONTENT</p>
          <p class="mb-0 text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            doloremque quasi reprehenderit earum nisi a obcaecati asperiores,
            eos suscipit officiis veniam nostrum illo excepturi accusantium
            quidem eius cumque assumenda id.
          </p>
        </div>
        <div class="col-3">
          LINKS
          <ul class="list-unstyled">
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </div>
        <div class="col-3">
          LINKS
          <ul class="list-unstyled">
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div
        class="h-100 align-items-center d-flex justify-content-center text-light"
      >
        © 2020 Copyright: LEXUANHUNG
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
#footer {
  height: 200px;
  width: 100vw;
  background-color: #4682b4;
  position: relative;
  .footer-content {
    color: #ffffff;
  }
  .footer-copyright {
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    background-color: #1864a3;
    text-align: center;
  }
}
</style>