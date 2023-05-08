
let state = {
  name: 'hang',
  num: 1,
}

// getters
const getters = {}

// actions
const actions = {
  changeName({ commit }, payload) {
    commit('save', payload);
  },
  changeAll(context, payload) {
    const { commit, rootState } = context;
    const { count } = rootState;
    console.log(context, count);
    commit('count/save', payload, { root: true });
  }
}

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