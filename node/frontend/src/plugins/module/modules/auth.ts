/* eslint-disable */
export default {
  namespaced: true,
  state: {
    name: null,
    id: null,
    authority: {}
  },
  getters: {
    name: (state: any) => state.name,
    id: (state: any) => state.id,
    authority: (state: any) => state.authority
  },
  actions: {
    getAuthData({ commit }: any, payload: object) {
      commit('setAuthData', payload)
    },
    refreshAuthData({ commit }: any) {
      commit('setRefreshAuthData')
    }
  },
  mutations: {
    setAuthData(state: any, payload: any) {
      Object.keys(payload).forEach((element) => {
        state[element] = payload[element]
      })
    },

    setRefreshAuthData(state: any) {
      state.id = null
      state.name = null
      state.authority = null
    }
  }
}
