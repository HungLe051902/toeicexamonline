
<script>
import $ from "jquery";
export default {
  methods: {
    create_UUID() {
      var dt = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    // Hàm show toast
    showNoti(type, message) {
      try {
        if (type) {
          this.$toast[type](message, {
            position: "top-center",
            timeout: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    showLoading() {
      try {
        $("#h-loading").show();
      } catch (e) {
        console.log(e);
      }
    },
    hideLoading() {
      try {
        $("#h-loading").hide();
      } catch (e) {
        console.log(e);
      }
    },
    /**
    Hàm giải mã token
     */
    parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    },
  },
};
</script>


<style lang='scss' scoped>
</style>
