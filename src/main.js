import Vue from "vue";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.$cookies.config('7d')

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  components: { App }
}).$mount("#app");
