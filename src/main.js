import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixins'
import 'element-ui/lib/theme-chalk/index.css';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Element from 'element-ui'

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 4,
  newestOnTop: true
});

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);

Vue.mixin(mixin)

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
