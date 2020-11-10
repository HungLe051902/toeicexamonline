<template>
  <Popup :divID="id" title="Đăng ký">
    <template slot="popup-body">
      <form>
        <div class="form-group">
          <label for="username">Tên đăng nhập</label>
          <input
            type="email"
            class="form-control"
            id="username"
            v-model.trim="$v.form.username.$model"
            aria-describedby="emailHelp"
            placeholder="Nhập tài khoản"
            :class="{ 'form-control--error': $v.form.username.$error }"
          />
          <div class="error" v-if="!$v.form.username.required && hasSubmited">
            Trường bắt buộc nhập
          </div>
          <div class="error" v-if="!$v.form.username.minLength && hasSubmited">
            Tên đăng nhập phải có ít nhất
            {{ $v.form.username.$params.minLength.min }} ký tự.
          </div>
        </div>
        <div class="form-group">
          <label for="register-password">Mật khẩu</label>
          <input
            type="password"
            class="form-control"
            id="register-password"
            v-model.trim="$v.form.password.$model"
            placeholder="Nhập mật khẩu"
            :class="{ 'form-control--error': $v.form.password.$error }"
          />
          <div class="error" v-if="!$v.form.password.required && hasSubmited">
            Trường bắt buộc nhập
          </div>
        </div>
        <div class="form-group">
          <label for="register-repassword">Nhập lại mật khẩu</label>
          <input
            type="password"
            class="form-control"
            id="register-repassword"
            v-model.trim="$v.repassword.$model"
            placeholder="Nhập lại mật khẩu"
            :class="{ 'form-control--error': repassword != form.password && hasSubmited}"
          />
          <div
            class="error"
            v-if="repassword != form.password && hasSubmited"
          >
            Mật khẩu phải giống hệt nhau.
          </div>
        </div>
      </form>
    </template>
    <template slot="popup-footer">
      <!--<button
        v-on:click="openLoginForm"
        type="submit"
        class="btn btn-light ml-3"
      >
        Đăng nhập
      </button>-->
      <button
        v-on:click="createAccount"
        type="submit"
        class="btn h-btn-primary"
      >
        Đăng ký
      </button>
    </template>
  </Popup>
</template>

<script>
import $ from "jquery";
import Popup from "@/components/Popup.vue";
import LoginService from "@/services/loginService.js";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    Popup,
  },
  data: function () {
    return {
      form: {
        username: "",
        password: "",
      },
      repassword: "",
      hasSubmited: false,
    };
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(6),
      },
      password: {
        required,
      },
    },
    repassword: {
      required
    },
  },
  methods: {
    // Hàm đóng form
    closeForm(isShowLogin) {
      try {
        // Tăt form đăng ký
        $("#" + this.id).modal("hide");
        // Emit ra sự kiện đóng modal
        this.$emit("closeModal", isShowLogin);
      } catch (e) {
        console.log(e);
      }
    },
    // Hàm tắt form đăng ký và mở form đăng nhập
    openLoginForm() {
      try {
        // Đóng form đăng ký
        this.closeForm(true);
        // Mở form đăng nhập
        // $("#login").modal("show");
        // this.$emit('openLoginForm');
      } catch (e) {
        console.log(e);
      }
    },
    // Hàm tạo tài khoản
    async createAccount() {
      try {
        this.$v.$touch();
        this.hasSubmited = true;
        if (
          this.form.username &&
          this.form.password &&
          this.form.password &&
          this.form.password == this.repassword
        ) {
          // if (this.form.password == this.repassword) {
          let user = {
            UserName: this.form.username,
            Password: this.form.password,
          };
          this.showLoading();
          var res = await LoginService.register(user);
          if (res) {
            this.hideLoading();
            if (res.data){
              $("#" + this.id).modal("hide");
              this.showNoti("success", "Đăng ký thành công!");
            }
            else {
              this.hideLoading();
              this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
            }
          }
          else {
            this.hideLoading();
            this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
          }
          // }
          // else {
          //   this.showNoti("warning", "Mật khẩu nhập lại không khớp!");
          // }
        }
        // else {
        //   this.showNoti("warning", "Xin hãy nhập đủ thông tin!");
        // }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
</style>
