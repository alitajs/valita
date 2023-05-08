const state = {
  all: 'oldAll'
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  save(state, payload) {
    Object.assign(state, payload);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}