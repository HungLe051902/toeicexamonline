<template>
  <!--<Popup :divID="id" @closeModal="closeModal" title="Đăng nhập">
    <template slot="popup-body">
      <form class="">
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.form.username.$error }"
        >
          <label for="login-username">Tài khoản:</label>
          <input
            type="text"
            class="form-control"
            id="login-username"
            placeholder="Nhập tài khoản"
            v-model.trim="$v.form.username.$model"
            name="login-username"
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
          <label for="login-pwd">Mật khẩu:</label>
          <input
            type="password"
            class="form-control"
            id="login-pwd"
            v-model.trim="$v.form.password.$model"
            placeholder="Nhập mật khẩu"
            name="login-pwd"
            :class="{ 'form-control--error': $v.form.password.$error }"
          />
          <div class="error" v-if="!$v.form.password.required && hasSubmited">
            Trường bắt buộc nhập
          </div>
        </div>
      </form>
    </template>
    <template slot="popup-footer">
      <button v-on:click="closeModal" type="submit" class="btn btn-light">
        Đóng
      </button>
      <button v-on:click="login" type="submit" class="btn h-btn-primary">
        Đăng nhập
      </button>
    </template>
  </Popup>-->
  <Dialog title="Đăng nhập" @closeDialog="closeDialog" :dialogVisible="isShow">
    <div
      class="form-group"
      :class="{ 'form-group--error': $v.form.username.$error }"
    >
      <label for="login-username">Tài khoản:</label>
      <input
        type="text"
        class="form-control"
        id="login-username"
        placeholder="Nhập tài khoản"
        v-model.trim="$v.form.username.$model"
        name="login-username"
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
      <label for="login-pwd">Mật khẩu:</label>
      <input
        type="password"
        class="form-control"
        id="login-pwd"
        v-model.trim="$v.form.password.$model"
        placeholder="Nhập mật khẩu"
        name="login-pwd"
        :class="{ 'form-control--error': $v.form.password.$error }"
      />
      <div class="error" v-if="!$v.form.password.required && hasSubmited">
        Trường bắt buộc nhập
      </div>
    </div>
    <template slot="dialog-footer">
      <button v-on:click="closeDialog" type="submit" class="btn btn-light">
        Đóng
      </button>
      <button v-on:click="login" type="submit" class="btn h-btn-primary ml-3">
        Đăng nhập
      </button>
    </template>
  </Dialog>
</template>

<script>
import $ from "jquery";
// import Popup from "@/components/Popup.vue";
import LoginService from "@/services/loginService.js";
import { required, minLength } from "vuelidate/lib/validators";
import Dialog from "@/components/Dialog.vue";
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    // Popup,
    Dialog,
  },
  data: function () {
    return {
      hasSubmited: false,
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    closeDialog() {
      try {
        this.$emit("closeLoginDialog");
      } catch (e) {
        console.log(e);
      }
    },
    // Hàm đóng modal
    closeModal() {
      // Clear hết dữ liệu
      this.form.username = "";
      this.form.password = "";
      this.hasSubmited = false;
      // Đóng modal
      $("#" + this.id).modal("hide");
      // Emit ra sự kiện đóng form
      this.$emit("closeModal");
    },
    // Thực hiện đăng nhập
    async login() {
      try {
        this.$v.$touch();
        this.hasSubmited = true;
        if (this.form.username && this.form.password && !this.$v.$invalid) {
          let dataPost = {
            UserName: this.form.username,
            Password: this.form.password,
          };
          this.showLoading();
          var res = await LoginService.login(dataPost);
          if (res) {
            this.hideLoading();
            if (res.data.APPCode == 200) {
              // Lưu token vào localStorage
              if (res.data.Data) {
                // localStorage.setItem("token", "Bearer " + res.data.Data);
                sessionStorage.setItem("token", "Bearer " + res.data.Data);
              }
              this.closeDialog();
              this.$router.push("/home");
              // location.reload();
              this.$emit("login-success");
            } else if (res.data.APPCode == 600) {
              this.showNoti(
                "warning",
                "Không tồn tại tài khoản trên hệ thống!"
              );
            } else {
              this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
            }
          } else {
            this.hideLoading();
            this.showNoti("error", "Có lỗi xảy ra. Vui lòng thử lại!");
          }
        }
        // else {
        //   this.showNoti('warning', 'Xin hãy nhập đủ thông tin!');
        // }
      } catch (e) {
        console.log(e);
      }
    },
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
</style>
