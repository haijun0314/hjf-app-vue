import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  isNavShow: true,
  userInfo: ''
}
const mutations = {
  showNav: (state) => {
    state.isNavShow = true
  },
  hideNav: (state) => {
    state.isNavShow = false
  },
  setUserInfo: (state, userInfo) => {
    state.userInfo = userInfo
  }
}
const getters = {
  getUserInfo: (state) => {
    return state.userInfo
  }
}
const actions = {
  showNav: ({ commit }) => {
    commit('showNav')
  },
  hideNav: ({ commit }) => {
    commit('hideNav')
  },
  setUserInfo: ({
    commit,
    userInfo
  }) => {
    alert(userInfo)
    commit('setUserInfo', userInfo)
  }
}
export default new Vuex.Store({
  mutations,
  state,
  getters,
  actions
})
