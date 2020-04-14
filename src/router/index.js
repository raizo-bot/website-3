import Vue from "vue";
import Router from "vue-router";
import Buefy from "buefy";
import LocalStorage from "vue-localstorage";
import Head from "vue-head";
import VueProgressBar from "vue-progressbar";

import MimitsuApi from "../api/MimitsuApi";

import Home from "../pages/Home.vue";
import NotFound from "../pages/NotFound.vue";
import Auth from "../pages/LoginAuth.vue";

// Dashboard
import SelectServer from "../pages/SelectServer.vue";
import Dashboard from "../pages/Dashboard.vue";

Vue.use(Buefy, { defaultTooltipAnimated: true, defaultToastDuration: 3000 });

Vue.use(VueProgressBar, {
  color: "#c696e2",
  failedColor: "#ff3860",
  transition: {
    speed: "0.2s",
    opacity: "0.1s"
  }
});

Vue.use(LocalStorage);
Vue.use(Head, { separator: "—", complement: "Mimitsu" });
Vue.use(Router);

Vue.use(MimitsuApi, {
  clientId: "672591094953017374",
  redirectUri: "http://localhost:8080/auth"
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
      component: Home
    },
    {
      path: "/auth",
      name: "Authentication",
      component: Auth
    },
    {
      path: "/dashboard",
      name: "Select a Server",
      component: SelectServer,
      meta: { requiresAuth: true }
    },
    {
      path: "/dashboard/:id",
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true }
    }
  ]
});
