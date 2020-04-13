import User from "./User";
import Guild from "./Guild";

export default {
  install: (Vue, options = {}) => {
    if (
      typeof process !== "undefined" &&
      (process.server ||
        process.SERVER_BUILD ||
        (process.env && process.env.VUE_ENV === "server"))
    ) {
      return;
    }

    const name = options.name || "api";
    const vueApi = new MimitsuApi({
      clientId: options.clientId,
      redirectUri: options.redirectUri
    });

    const token = Vue.localStorage && Vue.localStorage.get("token");
    if (token) {
      vueApi.loginWithToken(token).catch(err => {
        console.error(err);
        Vue.localStorage.remove("token");
      });
    }

    Vue.mixin({
      mounted() {
        if (
          this.$route &&
          this.$route.meta.requiresAuth &&
          !this.$api.state.logged &&
          !this.$api.state.logging
        ) {
          this.$router.push("/");
          return this.$buefy.toast.open({
            message: "You must login in order to access this content",
            type: "is-danger"
          });
        }
      }
    });

    Vue[name] = vueApi;
    Vue.prototype[`$${name}`] = vueApi;
  }
};

class MimitsuApi {
  constructor(options = {}) {
    this.windowOptions = {
      directories: 0,
      titlebar: 0,
      toolbar: 0,
      status: 0,
      menubar: 0,
      location: false,
      scrollbars: "no",
      resizable: "no",
      height: 570,
      width: 500
    };

    this.clientId = options.clientId;
    this.redirectUri = options.redirectUri;
    this.scope = options.scope = ["guilds", "identify"];

    this.state = { user: null, guilds: null, logged: false, logging: false };

    this._apiURL = "https://mimitsu.herokuapp.com/api";
  }

  // Bot statistics

  botStatistics() {
    return this._request("/bot/statistics");
  }

  // Modules

  getModule(mod, guild, defaultValue = "") {
    return this._request(
      `/modules/${guild.id}/${mod}?defaultValue=${defaultValue}`
    );
  }

  // Open an link to invite the bot to the designed guild

  openInvite(guild) {
    window.open(
      `https://discordapp.com/api/oauth2/authorize?client_id=${this.clientId}&permissions=19456&scope=bot&guild_id=${guild.id}`,
      "_blank",
      this._buildQuery(this.windowOptions, ",")
    );
  }

  // Open the login window

  openLoginWindow() {
    if (this.state.logging) return;

    window.open(
      this._buildOAuthURL(
        this.clientId,
        this.redirectUri,
        this.scope.join("%20"),
        "code"
      ),
      "_blank",
      this._buildQuery(this.windowOptions, ",")
    );
  }

  // Login an user to the website

  async login(code) {
    this.state.logging = true;

    try {
      const { token } = await this._tokenRequest(code);

      this.token = token;

      return token;
    } catch (err) {
      this.logout();
      throw err;
    }
  }

  // Login with an existent token

  async loginWithToken(token) {
    this.state.logging = true;

    try {
      this.token = token;

      await this.profile();
      return token;
    } catch (err) {
      this.logout();

      throw err;
    }
  }

  // Logout an user from the website

  logout() {
    this.state.logged = false;
    this.state.logging = false;
    this.state.user = null;
    this.state.guilds = null;
    this.token = null;
  }

  // Retrive all informations about it's user

  profile() {
    this.state.logging = true;

    return this._request("/web/@me").then(({ user, guilds }) => {
      this.state.logged = true;
      this.state.logging = false;

      this.state.user = new User(user);

      if (guilds) this.state.guilds = guilds.map(g => new Guild(g));
    });
  }

  // Request informations in a REST api

  _request(endpoint, { method = "GET", query, body } = {}) {
    return fetch(`${this._apiURL}${endpoint}?${this._buildQuery(query)}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `User ${this.token}`
      },
      body: body ? JSON.stringify(body) : undefined,
      method
    }).then(res => res.json());
  }

  // Request a token authentication

  _tokenRequest(code) {
    return fetch(`${this._apiURL}/web/login?code=${code}`).then(res =>
      res.json()
    );
  }

  // Build oauth link

  _buildOAuthURL(clientId, redirectUri, scope, responseType) {
    return `https://discordapp.com/oauth2/authorize?${this._buildQuery({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: responseType,
      scope
    })}`;
  }

  // Build a rest query

  _buildQuery(obj, join = "&") {
    return obj
      ? Object.entries(obj)
          .map(a => a.join("="))
          .join(join)
      : "";
  }
}
