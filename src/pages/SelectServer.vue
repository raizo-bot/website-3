<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-spaced">Server List</h1>

      <hr />

      <div v-for="guild in paginatedItems" :key="guild.id">
        <router-link v-if="guild.common" :to="`/dashboard/${guild.id}`">
          <b-button type="is-primary" class="is-right" size="is-medium" rounded>Manage Guild</b-button>
        </router-link>

        <a v-else @click="openInvite(guild)">
          <b-button type="is-primary" class="is-right" size="is-medium" rounded>Invite Mimitsu</b-button>
        </a>

        <GuildIcon :guild="guild" />
      </div>

      <b-pagination
        :total="guilds.length"
        :current.sync="current"
        per-page="5"
        range-before="2"
        range-after="2"
        order="is-centered"
        aria-next-label="Next"
        aria-previous-label="Previous"
        aria-page-label="Page"
        aria-current-label="Current page"
        rounded
      ></b-pagination>
    </div>
    <b-loading :active="!guilds" />
  </section>
</template>

<script>
import GuildIcon from "../components/GuildIcon.vue";

export default {
  name: "SelectServer",
  head: { title: { inner: "Select a Server" } },
  components: { GuildIcon },
  data() {
    return {
      discord: this.$api.state,
      current: 1
    };
  },
  computed: {
    guilds() {
      return this.discord.guilds
        ? this.discord.guilds.filter(guild =>
            guild.permissions.has("MANAGE_GUILD")
          )
        : [];
    },
    paginatedItems() {
      const page_number = this.current - 1;

      return this.guilds.slice(page_number * 5, (page_number + 1) * 5);
    }
  },
  methods: {
    openInvite(guild) {
      return this.$api.openInvite(guild);
    }
  }
};
</script>
