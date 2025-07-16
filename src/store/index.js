import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentAddress: "",
    userInfo: null,
    allModules: [],
    allChains: [],
    allTokens: [],
    allExchanges: [],
  },
  getters: {
    currentAddress: (state) => state.currentAddress,
    userInfo: (state) => state.userInfo,
    allModules: (state) => state.allModules,
    allChains: (state) => state.allChains,
    allTokens: (state) => state.allTokens,
    allExchanges: (state) => state.allExchanges,
  },
  mutations: {
    SET_CURRENT_ADDRESS(state, address) {
      Vue.set(state, "currentAddress", address);
    },
    SET_USER_INFO(state, userInfo) {
      Vue.set(state, "userInfo", userInfo);
    },
    SET_ALL_MODULES(state, modules) {
      Vue.set(state, "allModules", modules);
    },
    SET_ALL_CHAINS(state, chains) {
      Vue.set(state, "allChains", chains);
    },
    SET_ALL_TOKENS(state, tokens) {
      Vue.set(state, "allTokens", tokens);
    },
    SET_ALL_EXCHANGES(state, exchanges) {
      Vue.set(state, "allExchanges", exchanges);
    },
  },
  actions: {
    setCurrentAddress: ({ commit }, address) =>
      commit("SET_CURRENT_ADDRESS", address),
    setUserInfo: ({ commit }, userInfo) => commit("SET_USER_INFO", userInfo),
    setAllModules: ({ commit }, modules) => commit("SET_ALL_MODULES", modules),
    setAllChains: ({ commit }, chains) => commit("SET_ALL_CHAINS", chains),
    setAllTokens: ({ commit }, tokens) => commit("SET_ALL_TOKENS", tokens),
    setAllExchanges: ({ commit }, exchanges) =>
      commit("SET_ALL_EXCHANGES", exchanges),
  },
  modules: {},
});
