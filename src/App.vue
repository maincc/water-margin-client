<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import {
  fetchModules,
  fetchChains,
  fetchTokens,
  fetchExchanges,
} from "@/js/api/v1/public";

export default {
  name: "App",
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        const modules = await fetchModules();
        this.$store.dispatch("setAllModules", modules);
        const chains = await fetchChains();
        this.$store.dispatch("setAllChains", chains);
        const tokens = await fetchTokens();
        this.$store.dispatch("setAllTokens", tokens);
        const exchanges = await fetchExchanges();
        this.$store.dispatch("setAllExchanges", exchanges);
      } catch (error) {
        this.$message.error(error.message);
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
