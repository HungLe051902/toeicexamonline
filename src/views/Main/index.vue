<template>
  <div>
    <div class="header">
      <div
        class="main-topbar d-flex justify-content-between align-items-center"
      >
        <div class="topbar-left">
          <h1 class="mb-0">Thi TOEIC trực tuyến</h1>
        </div>
        <div class="topbar-right">
          <button
            v-on:click="isShowRegisterForm = true"
            type="button"
            class="btn btn-light"
            data-toggle="modal"
            data-target="#register"
          >
            Đăng ký
          </button>
          <button
            v-on:click="isShowLoginForm = true"
            type="button"
            class="btn h-btn-primary ml-3"
            data-toggle="modal"
            data-target="#login"
          >
            Đăng nhập
          </button>
        </div>
      </div>
      <div class="toolbar">
        <div class="u-navbar d-flex justify-content-start align-items-center">
          <div
            v-on:click="showNoti('info', 'Chức năng đang phát triển!')"
            class="navbar-item"
          >
            Trang chủ
          </div>
          <div
            v-on:click="showNoti('info', 'Chức năng đang phát triển!')"
            class="navbar-item"
          >
            Luyện thi TOEIC
          </div>
          <div
            v-on:click="showNoti('info', 'Chức năng đang phát triển!')"
            class="navbar-item"
          >
            Danh mục
          </div>
          <div
            v-on:click="showNoti('info', 'Chức năng đang phát triển!')"
            class="navbar-item"
          >
            Mẹo thi TOEIC
          </div>
          <div v-on:click="goToExamView" class="navbar-item">
            Thi trực tuyến
          </div>
        </div>
      </div>
      <Register
        id="register"
        :isShow="isShowRegisterForm"
        @closeRegisterDialog="isShowRegisterForm = false"
        @openLoginForm="isShowRegisterForm = false;isShowLoginForm = true"
        v-if="isShowRegisterForm"
      />
      <LogIn
        id="login"
        :isShow="isShowLoginForm"
        @closeLoginDialog="isShowLoginForm = false"
        v-if="isShowLoginForm"
      />
    </div>
    <div class="content w-100">
      <div class="intro w-100 p-4">
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
import $ from "jquery";
import Register from "@/views/Account/Register.vue";
import LogIn from "@/views/Account/LogIn.vue";
export default {
  created () {
    console.log("enviroment", process.env.VUE_APP_BASE_URL_LOGIN);
  },
  data() {
    return {
      isShowLoginForm: false,
      isShowRegisterForm: false,
    };
  },
  name: "Main",
  components: {
    Register,
    LogIn,
  },
  methods: {
    // Hàm đóng form đăng ký
    closeRegisterForm(isShowLoginForm) {
      try {
        if (isShowLoginForm) {
          // var vm = this;
          this.isShowRegisterForm = false;
          // this.$nextTick(function(){
          //   setTimeout(function(){vm.openLoginForm();}, 1000);

          // })
        } else {
          this.isShowRegisterForm = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Hàm mở form đăng nhập
    openLoginForm() {
      try {
        this.isShowLoginForm = Object.assign(true);
        $("#login").modal("show");
      } catch (e) {
        console.log(e);
      }
    },
    // Nhảy sang màn hình thi trực tuyến
    goToExamView() {
      try {
        this.$router.push("toeicexam");
      } catch (e) {
        console.log(e);
      }
    },
    showRegisterForm() {},
  },
};
</script>

<style lang="scss" scoped>
.main-topbar {
  height: 50px;
  position: absolute;
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
  background-color: #1864a3;
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
      background-color: #075696;
    }
  }
}
.content {
  position: absolute;
  top: 106px;
}
</style>
