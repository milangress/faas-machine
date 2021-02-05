import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    googleSheets: {}
  },
  mutations: {
  },
  actions: {
    /* loadUsers({commit}) {
      Vue.axios.get('users').then(result => {
        commit('SAVE_USERS', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    } */
  },
  modules: {
  }
})
