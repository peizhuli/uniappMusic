const state = {
  userInfo: null
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}