import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  isNavShow: true,
  toaken: ''
}
const mutations = {
  showNav: (state) => {
    state.isNavShow = true
  },
  hideNav: (state) => {
    state.isNavShow = false
  },
  setToaken: (state, toaken) => {
    state.toaken = toaken
  }
}
const actions = {
  showNav: ({ commit }) => {
    commit('showNav')
  },
  hideNav: ({ commit }) => {
    commit('hideNav')
  },
  setToaken: ({
    commit,
    toaken
  }) => {
    commit('setToaken', toaken)
  }
}
export default new Vuex.Store({
  mutations,
  state,
  actions
})
