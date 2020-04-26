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
          <h1 class="subtitle home-hero">
            Mimitsu, a focused <strong>RPG</strong> discord bot 
          </h1>

          <div class="buttons">
            <b-button size="is-medium" tag="router-link" to="/documentation">Get Started</b-button>
            <b-button
              size="is-medium"
              type="is-primary"
              tag="router-link"
              to="/features"
              rounded
            >Learn More</b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  head: { title: { inner: "Home" } },
};
</script>
