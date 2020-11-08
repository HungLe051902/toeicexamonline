<template>
  <Popup :id="id" title="Đăng ký">
    <template slot="popup-body">
      <form>
        <div class="form-group">
          <label for="nickname">Tên đăng nhập</label>
          <input
            type="email"
            class="form-control"
            id="nickname"
            v-model="form.nickname"
            aria-describedby="emailHelp"
            placeholder="Nhập tài khoản"
          />
        </div>
        <div class="form-group">
          <label for="register-password">Mật khẩu</label>
          <input
            type="password"
            class="form-control"
            id="register-password"
            v-model="form.password"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div class="form-group">
          <label for="register-repassword">Nhập lại mật khẩu</label>
          <input
            type="password"
            class="form-control"
            id="register-repassword"
            v-model="repassword"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
      </form>
    </template>
    <template slot="popup-footer">
      <button type="submit" class="btn btn-light ml-3">Đăng nhập</button>
      <button v-on:click="createAccount" type="submit" class="btn btn-primary">Đăng ký</button>
    </template>
  </Popup>
</template>

<script>
import Popup from "@/components/Popup.vue";
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
        nickname: "",
        password: "",
      },
      repassword: "",
    };
  },
  methods: {
    createAccount() {
      try {
        if (this.form.nickname && this.form.password && (this.form.password == this.repassword)) {
          alert("Tạo tài khoản");
        }
        else {
            alert("Hãy nhập đủ thông tin")
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
