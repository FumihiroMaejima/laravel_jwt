export default {
  namespaced: true,
  state: {
    name: null,
    id: null,
    authority: {}
  },
  actions: {
    getAuth({ commit }: any, payload: any) {
      commit('setAuth', payload)
    }
  },
  mutations: {
    setAuth(state: any, payload: any) {
      Object.keys(payload).forEach(element => {
        state[element] - payload[element]
      })
    }
  }
}
