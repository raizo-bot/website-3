import Vue from "vue";
import Router from "vue-router";
import Buefy from "buefy";
import LocalStorage from "vue-localstorage";
import Head from "vue-head";
import VueProgressBar from "vue-progressbar";

import MimitsuApi from "../api/MimitsuApi";

import Homepage from "../pages/Homepage.vue";
import NotFound from "../pages/NotFound.vue";
import Auth from "../pages/LoginAuth.vue";

Vue.use(Buefy, { defaultTooltipAnimated: true, defaultToastDuration: 3000 });

Vue.use(LocalStorage);
Vue.use(Head, { separator: "|", complement: "Mimitsu" });
Vue.use(Router);

Vue.use(MimitsuApi, {
  clientId: "672591094953017374",
  redirectUri: "http://localhost:8080/auth"
});

Vue.use(VueProgressBar, {
  color: "#7957d5",
  failedColor: "#ff3860",
  transition: {
    speed: "0.2s",
    opacity: "0.1s"
  }
});

export default new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    },
    {
      path: "/",
      name: "Home",
      component: Homepage
    },
    {
      path: "/auth",
      name: "Authentication",
      component: Auth
    }
  ]
});
