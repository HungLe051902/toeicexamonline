<template>
  <div>
    <div class="header">
      <div
        class="main-topbar d-flex justify-content-between align-items-center"
      >
        <div class="topbar-left">
          <h1 class="mb-0">Thi TOEIC Online</h1>
        </div>
        <div class="topbar-right">
          <button
            type="button"
            class="btn btn-light"
            data-toggle="modal"
            data-target="#register"
          >
            Đăng ký
          </button>
          <button
            type="button"
            class="btn btn-primary ml-3"
            data-toggle="modal"
            data-target="#login"
          >
            Đăng nhập
          </button>
        </div>
      </div>
      <div class="toolbar">
        <div class="u-navbar d-flex justify-content-start align-items-center">
          <div class="navbar-item">Trang chủ</div>
          <div class="navbar-item">Luyện thi TOEIC</div>
          <div class="navbar-item">Danh mục</div>
          <div class="navbar-item">Mẹo thi TOEIC</div>
          <div class="navbar-item">Thi trực tuyến</div>
        </div>
      </div>
      <Register id="register" />
      <LogIn id="login" />
    </div>
    <div class="content w-100">
      <div class="intro w-100 p-3">
        <h2>Thi TOEIC trực tuyến miễn phí</h2>
        <p class="p-2 wrap text-left">
          TOEIC là một chứng chỉ được sử dụng phổ biến nhằm đánh giá trình độ sử
          dụng tiếng Anh trong môi trường giao tiếp quốc tế. Ở Việt Nam, chứng
          chỉ TOEIC là một trong những tiêu chuẩn phổ biến để đánh giá trình độ
          thông thạo tiếng Anh của người lao động được nhiều doanh nghiệp, tổ
          chức lựa chọn. Ngoài ra, TOEIC còn là chuẩn đầu ra tiếng Anh của nhiều
          trường đại học cho sinh viên khi tốt nghiệp. Bài thi toeic gồm 2 phần
          là phần đọc và phần nghe. Để giúp các bạn có mong muốn thi toeic có
          thể làm quen với đề thi trước khi thi thật. Nhóm chúng em có ý định
          xây dựng web thi thử toeic online. Các đề thi làm trên web đều được
          chấm điểm và có đáp án chi tiết để giúp các bạn có thể đánh giá chính
          xác nhất trình độ hiện tại của mình và có thể đưa ra kế hoạch luyện
          thi và học tập phù hợp.
        </p>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
// import $ from "jquery";
import Register from "@/views/Account/Register.vue";
import LogIn from "@/views/Account/LogIn.vue";
export default {
  name: "Main",
  components: {
    Register,
    LogIn
  },
  methods: {
    showRegisterForm() {},
  },
};
</script>

<style lang="scss" scoped>
.main-topbar {
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 0 24px;
  background-color: #f0f0f0;
}
.toolbar {
  top: 50px;
  position: absolute;
  width: 100vw;
  background-color: #4cbb17;
}
.u-navbar {
  height: 100%;
  padding: 0 24px;
  .navbar-item {
    padding: 16px 8px;
    color: white;
    vertical-align: center;
    height: 100%;
    &:hover {
      cursor: pointer;
      background-color: #006400;
    }
  }
}
.content {
  position: absolute;
  top: 106px;
}
</style>
