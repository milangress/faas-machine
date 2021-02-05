import Vuex from 'vuex'

export default Vuex.createStore({
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
