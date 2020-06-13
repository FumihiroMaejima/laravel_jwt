/* eslint-disable */
export default {
  namespaced: true,
  state: {
    name: null,
    id: null,
    token: null,
    authority: {}
  },
  getters: {
    name: (state: any) => state.name,
    id: (state: any) => state.id,
    token: (state: any) => state.token,
    authority: (state: any) => state.authority
  },
  actions: {
    getAuthData({ commit }: any, payload: object) {
      commit('setAuthData', payload)
    },
    refreshAuthData({ commit }: any) {
      commit('setRefreshAuthData')
    },
    getToken({ commit }: any, payload: string) {
      commit('setToken', payload)
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
      state.token = null
      state.authority = null
    },

    setToken(state: any, payload: string) {
      state.token = payload
    }
  }
}
