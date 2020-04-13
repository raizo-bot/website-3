<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-spaced">Server List</h1>

      <hr />

      <div v-for="guild in paginatedItems" :key="guild.id">
        <router-link v-if="guild.common" :to="`/dashboard/${guild.id}`">
          <b-button type="is-primary" class="is-right" size="is-medium" rounded>Go to Dashboard</b-button>
        </router-link>

        <a v-else @click="openInvite(guild)">
          <b-button type="is-primary" class="is-right" size="is-medium" rounded>Invite to Discord</b-button>
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
    <!--
    <div class="container has-text-centered">
      <h1 class="title is-spaced">Servers</h1>
      <div class="columns is-multiline is-centered">
        <div v-for="guild in guilds" :key="guild.id" class="column is-2 has-text-centered">
          <router-link v-if="guild.common" :to="`/dashboard/${guild.id}`">
            <GuildIcon :guild="guild" />
          </router-link>
          <a v-else class="not-common-guild" @vclick="openInvite(guild)">
            <GuildIcon :guild="guild" />
          </a>
        </div>
        <span v-if="guilds.length === 0" class="error">Couldn't find any manageable server :(</span>
      </div>
    </div>
    <b-loading :active="!guilds" />-->
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
