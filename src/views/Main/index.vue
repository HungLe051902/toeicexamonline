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
          <template v-if="!hasLogined">
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
          </template>
          <template v-else>
            <img src="@/assets/icons/avatar.png" alt="Avatar" class="avatar" />
            <span class="ml-2">{{ currentUsername }}</span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  ><span v-on:click="logout">Đăng xuất</span></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </div>
      </div>
      <div id="toolbar" class="">
        <div class="u-navbar d-flex justify-content-start align-items-center">
          <div
            v-on:click="$router.push('/home')"
            class="navbar-item"
            v-bind:class="$route.name == 'Home' ? 'active-item' : ''"
          >
            Trang chủ
          </div>
          <div
            v-on:click="$router.push('/TOEICPreparation')"
            class="navbar-item"
            v-bind:class="
              $route.name == 'TOEICPreparation' ? 'active-item' : ''
            "
          >
            Luyện thi TOEIC
          </div>
          <div
            v-on:click="$router.push('/directory')"
            class="navbar-item"
            v-bind:class="$route.name == 'Directory' ? 'active-item' : ''"
          >
            Danh mục
          </div>
          <div
            v-on:click="$router.push('/examtip')"
            class="navbar-item"
            v-bind:class="$route.name == 'ExamTip' ? 'active-item' : ''"
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
        @openLoginForm="
          isShowRegisterForm = false;
          isShowLoginForm = true;
        "
        v-if="isShowRegisterForm"
      />
      <LogIn
        id="login"
        :isShow="isShowLoginForm"
        @closeLoginDialog="isShowLoginForm = false"
        @login-success="handleLoginSuccess"
        v-if="isShowLoginForm"
      />
    </div>
    <router-view></router-view>
    <div class="footer"></div>
  </div>
</template>

<script>
import $ from "jquery";
import Register from "@/views/Account/Register.vue";
import LogIn from "@/views/Account/LogIn.vue";
import AuthenticationEnum from "@/enums/AuthenticationEnum";
export default {
  created() {
    // console.log("enviroment", process.env.VUE_APP_BASE_URL_LOGIN);
  },
  data() {
    return {
      isShowLoginForm: false,
      isShowRegisterForm: false,
      hasLogined: false
    };
  },
  name: "Main",
  components: {
    Register,
    LogIn,
  },
  methods: {
    /**
    Hàm xử lý khi đăng nhập thành công */
    handleLoginSuccess(){
      try {
        this.hasLogined = true;
      } catch(e){
        console.log(e);
      }
    },
    /**
    Hàm thực hiện đăng xuất
    Author: LXHUNG(06/12/2020)
     */
    logout() {
      try {
        localStorage.removeItem('token');
        this.hasLogined = false;
        this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    },
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
  computed: {
    // hasLogined() {
    //   if (localStorage.getItem("token")) {
    //     return true;
    //   }
    //   return false;
    // },
    currentUsername() {
      if (!localStorage.getItem("token")) {
        return "USERNAME";
      }
      return this.parseJwt(localStorage.getItem("token"))[
        AuthenticationEnum.USERNAME
      ];
    },
  },
  mounted() {
    // When the user scrolls the page, execute myFunction
    window.onscroll = function () {
      myFunction();
    };

    // Get the navbar
    var navbar = document.getElementById("toolbar");

    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.main-topbar {
  height: 50px;
  // position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 0 24px;
  background-color: #f0f0f0;
}
#toolbar {
  // top: 50px;
  // position: absolute;
  width: 100vw;
  background-color: #1864a3;
}

.u-navbar {
  // height: 100%;
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

.sticky {
  position: fixed;
  top: 0;
  // width: 100%;
}

.active-item {
  background-color: #075696;
}

.avatar {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
