// Packages
import Vue from "vue";
import Router from "vue-router";
import Buefy from "buefy";
import VueCookies from 'vue-cookies'
import Head from "vue-head";
import VueProgressBar from "vue-progressbar";

// Api
import MimitsuApi from "../api/MimitsuApi";

// Pages
import Home from "../pages/Home.vue";
import NotFound from "../pages/NotFound.vue";
import Auth from "../pages/LoginAuth.vue";

// Dashboard
import SelectServer from "../pages/SelectServer.vue";
import Dashboard from "../pages/Dashboard.vue";

Vue.use(Buefy, { defaultTooltipAnimated: true, defaultToastDuration: 3000 });

Vue.use(VueProgressBar, {
  color: "#de89be",
  failedColor: "#ff3860",
  transition: {
    speed: "0.2s",
    opacity: "0.1s"
  }
});

Vue.use(VueCookies);
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
    },
    {
      path: '/invite',
      beforeEnter() {
        window.location.href = 'https://discordapp.com/api/oauth2/authorize?client_id=672591094953017374&permissions=19520&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth&scope=bot'
      }
    },
    {
      path: '/support',
      beforeEnter() { window.location.href = 'https://discord.gg/bXuhCy' }
    }
  ]
});
