<template>
  <section>
    <div class="block">
      <b-field label="Prefix">
        <b-input
          maxlength="10"
          v-model="prefix"
          required
          placeholder="Prefix used to execute commands. Ex.: m!"
        ></b-input>
      </b-field>

      <small>
        <strong>Language</strong>
      </small>

      <br />
      <br />

      <b-radio v-model="language" name="language" native-value="English (EN-US)">English (EN-US)</b-radio>
    </div>

    <footer class="modal-card-foot module-card-footer">
      <b-button type="is-primary" :loading="saving" @click="save()">Save</b-button>
    </footer>
  </section>
</template>

<script>
export default {
  props: {
    guild: Object
  },
  data() {
    return {
      saving: false,
      prefix: "m!",
      language: "English (EN-US)"
    };
  },
  async mounted() {
    const prefix = await this.$api.getModule("prefix", this.guild, "m!");

    console.log(prefix);
    this.prefix = prefix;
  },
  methods: {
    save() {
      this.saving = true;
      this.update();
    },
    update() {
      this.successSaveToast();
      this.saving = false;
    },
    successSaveToast() {
      this.$buefy.toast.open({
        message: `Prefix saved successfully!`,
        type: "is-success"
      });
    }
  }
};
</script>