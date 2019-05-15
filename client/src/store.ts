import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    login(state, user) {
      state.user = user
    },
    logout(state) {
      state.user = ''
    }
  },
  actions: {
    login(context, user) {
      context.commit('login', user)
    },
    logout(context) {
      context.commit('logout')
    }
  },
  plugins: [createPersistedState()]
})
