<template>
  <nav
    class="navbar docs-navbar is-spaced has-shadow is-primary is-transparent"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">MIMITSU</router-link>

        <a
          class="navbar-burger"
          v-on:click="burger"
          role="button"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" ref="navMenu">
        <div class="navbar-start">
          <router-link to="/commands" class="navbar-item">
            <b-icon pack="fas" icon="terminal" custom-size="mdi-18px" class="is-hidden-desktop" />
            <span>Commands</span>
          </router-link>

          <a class="navbar-item" href="https://github.com/MimitsuBot/" target="_blank">
            <b-icon icon="github-circle" custom-size="mdi-18px" class="is-hidden-desktop" />
            <span>GitHub</span>
          </a>
        </div>

        <div class="navbar-end">
          <div v-if="!!discord.user" class="navbar-item has-dropdown" ref="navDropdown">
            <div class="navbar-link is-flex" v-on:click="dropdown">
              <figure class="image is-32x32 user-pic">
                <img draggable="false" class="round" :src="discord.user.displayAvatarURL" />
              </figure>
              <span>{{ discord.user.username }}</span>
            </div>
            <div class="navbar-dropdown is-boxed">
              <router-link to="/profile" class="navbar-item">
                <b-icon icon="account-box" custom-size="mdi-18px" />
                <span>Profile</span>
              </router-link>
              <router-link to="/dashboard" class="navbar-item">
                <b-icon icon="view-dashboard" custom-size="mdi-18px" />
                <span>Dashboard</span>
              </router-link>
              <hr class="navbar-divider" />
              <a class="navbar-item" v-on:click="logout">
                <b-icon icon="logout-variant" custom-size="mdi-18px" />
                <span>Logout</span>
              </a>
            </div>
          </div>
          <a v-else class="navbar-item" v-on:click="login">
            <template v-if="discord.logging">
              <b-icon icon="loading" custom-size="mdi-18px" class="loading-spinner" />
              <span>Logging in...</span>
            </template>
            <template v-else>
              <b-icon icon="login-variant" custom-size="mdi-18px" />
              <span>Login</span>
            </template>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return { discord: this.$api.state };
  },
  methods: {
    burger(event) {
      const $burger = event.target.closest(".navbar-burger");
      const $target = this.$refs.navMenu;
      $burger.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    },
    dropdown() {
      const $target = this.$refs.navDropdown;
      $target.classList.toggle("is-active");
    },
    login() {
      this.$api.openLoginWindow();
    },
    logout() {
      this.$api.logout();
      this.$localStorage.remove("token");
    }
  }
};
</script>
