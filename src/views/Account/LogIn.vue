<template>
  <Popup :id="id" title="Đăng nhập">
    <template slot="popup-body">
      <form class="was-validated">
        <div class="form-group">
          <label for="uname">Tài khoản:</label>
          <input
            type="text"
            class="form-control"
            id="uname"
            placeholder="Nhập tài khoản"
            v-model="form.username"
            name="uname"
            required
          />
          <div class="valid-feedback">Hợp lệ.</div>
          <div class="invalid-feedback">Vui lòng điền vào trường này.</div>
        </div>
        <div class="form-group">
          <label for="pwd">Mật khẩu:</label>
          <input
            type="password"
            class="form-control"
            id="pwd"
            v-model="form.password"
            placeholder="Nhập mật khẩu"
            name="pswd"
            required
          />
          <div class="valid-feedback">Hợp lệ.</div>
          <div class="invalid-feedback">Vui lòng điền vào trường này.</div>
        </div>
      </form>
    </template>
    <template slot="popup-footer">
      <button v-on:click="login" type="submit" class="btn btn-primary">
        Đăng nhập
      </button>
    </template>
  </Popup>
</template>

<script>
import $ from 'jquery';
import Popup from "@/components/Popup.vue";
import LoginService from "@/services/loginService.js";
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
    };
  },
  methods: {
    async login() {
      try {
        if (this.form.username && this.form.password) {
          let dataPost = {
            UserName: this.form.username,
            Password: this.form.password,
          };
          var res = await LoginService.login(dataPost);
          if (res.data) {
            $('#'+this.id).modal('hide');
            this.$router.push("/toeicexam");
          } else {
            this.showNoti('warning', 'Không tồn tại tài khoản trên hệ thống!');
          }
        } else {
          this.showNoti('warning', 'Xin hãy nhập đủ thông tin!');
        }
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
