<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <div class="columns">
          <div class="column">
            <p>
              Design made by
              <a href="https://github.com/Loliticos" target="_blank">Loliticos</a>
            </p>
            <p>
              <small>
                Mimitsu's source code is licensed under
                <a
                  href="http://opensource.org/licenses/mit-license.php"
                  target="_blank"
                >MIT</a>.
              </small>
            </p>

            <b-field>
              <p class="control">
                <a class="button" href="https://github.com/MimitsuBot" target="_blank">
                  <b-icon icon="github-circle" />
                  <span>GitHub</span>
                </a>
              </p>
            </b-field>
            <small>
              This site is powered by
              <a href="https://www.netlify.com">Netlify</a>
            </small>
          </div>

          <div class="column">
            <router-link to="/" exact class="navbar-item has-text-weight-semibold">Home</router-link>

            <router-link
              to="/documentation"
              class="navbar-item has-text-weight-semibold"
            >Documentation</router-link>

            <router-link to="/invite" class="navbar-item has-text-weight-semibold">Invite</router-link>

            <router-link to="/support" class="navbar-item has-text-weight-semibold">Support Server</router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
