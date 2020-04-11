<template>
  <div id="app">
    <section class="main-container">
      <vue-progress-bar />
      <Navbar />

      <router-view />
      <Footer />
    </section>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: { Navbar, Footer },
  head: {
    link: [{ r: "shortcut icon", t: "image/png", h: "/static/favicon.png" }],
    meta: [
      { ch: "utf-8" },
      { n: "viewport", c: "width=device-width, initial-scale=1" }
    ]
  },
  methods: {
    mounted() {
      this.$Progress.finish();
    },
    created() {
      this.$Progress.start();
      this.$router.beforeEach((to, from, next) => {
        this.$Progress.start();
        next();
      });
      this.$router.afterEach((to, from) => {
        this.$Progress.finish();
      });
    }
  }
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

html {
  overflow: auto;
}

.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
