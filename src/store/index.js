import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  getters: {
    isLogin (state) {
      return state.isLogin
    }
  },
  mutations: {
    changeLoginStatus (state, isLogin) {
      state.isLogin = isLogin;
    }
  },
  actions: {
  },
  modules: {
  }
})
