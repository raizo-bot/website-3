<template>
  <div class="fill-flex dashboard-container">
    <div class="fill-flex" v-if="guild">
      <section class="hero is-primary">
        <div class="hero-body header-body">
          <div class="container">
            <GuildIcon :guild="guild" :tooltip="false" :size="128" class="flex-center" />
            <div class="flex-center has-text-centered">
              <h1 class="title">{{ guild.name }}</h1>
              <span>
                <b-button
                  rounded
                  size="is-small"
                  type="is-dark"
                  tag="router-link"
                  to="/dashboard"
                >Change server</b-button>
              </span>
            </div>
          </div>
        </div>
      </section>
      <b-tabs class="fill-flex" position="is-centered" size="is-medium" v-model="activeTab">
        <b-tab-item class="fill-flex" label="General">
          <DashboardGeneral :guild="guild" />
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import GuildIcon from "../components/GuildIcon.vue";
import DashboardGeneral from "../components/DashboardGeneral.vue";

export default {
  name: "Dashboard",
  head: { title: { inner: "Dashboard" } },
  components: { GuildIcon, DashboardGeneral },
  data() {
    return {
      discord: this.$api.state
    };
  },
  computed: {
    guild() {
      if (!this.discord.guilds) return;
      const guild = this.discord.guilds.find(
        g => g.id === this.$route.params.id
      );
      return guild && guild.common && guild.permissions.has("MANAGE_SERVER")
        ? guild
        : null;
    }
  }
};
</script>
