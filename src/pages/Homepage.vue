<template>
  <section class="home">
    <div class="hero is-fullheight is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="logo-rounded home-hero">
            <img
              src="https://cdn.discordapp.com/avatars/672591094953017374/fe01d17cf86aa306655a7f0dd705558f.png?size=2048"
              alt="Mimitsu"
            />
          </div>
          <h2 class="subtitle home-hero">
            <strong>Mimitsu</strong> a RPG focused discord bot
          </h2>

          <div class="buttons">
            <router-link class="button is-medium home-hero" to="/invite">Invite Mimitsu</router-link>
            <a
              class="button is-medium is-primary home-hero"
              href="https://github.com/buefy/buefy/releases"
              target="_blank"
            >
              <b-icon icon="discord" />
              <span>Support Server</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column has-text-centered features">
              <b-icon icon="github-circle" size="is-large" />
              <p class="title is-4">
                <strong>Open Source</strong>
              </p>
              <p class="subtitle">
                Open source on
                <strong>
                  <a href="https://github.com/MimitsuBot" target="_blank">GitHub</a>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "Home",
  head: { title: { inner: "Home" } }
};
</script>
