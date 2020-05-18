/* classic mode */
// import { Module } from 'vuex'
// import getters from './getters'
// import actions from './actions'
// import mutations from './mutations'
// import { LoginState, RootState } from '~/store/types'
/* module mode */
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { LoginState, RootState, PostData } from '~/store/types'

/* module modeの場合はexportを追記してfunction形式にする */
/* const state: LoginState = {
  postData: {
    name: '',
    password: '',
    token: ''
  }
} */
export const state = () => ({
  postData: {
    name: '',
    password: '',
    token: ''
  }
})

/* module mode の時はlogin.ts内に記述する classic modeの場合はファイルを別ける。 */
export const getters: GetterTree<LoginState, RootState> = {
  name: (state: LoginState) => state.postData.name,
  password: (state: LoginState) => state.postData.password,
  token: (state: LoginState) => state.postData.token
}

export const actions: ActionTree<LoginState, RootState> = {
  getNameDataAction: ({ commit }, payload: PostData['name']) => {
    commit('setNameData', payload)
  },
  getPasswordDataAction: ({ commit }, payload: PostData['password']) => {
    commit('setPasswordData', payload)
  },
  getTokenDataAction: ({ commit }, payload: PostData['token']) => {
    commit('setTokenData', payload)
  }
}

export const mutations: MutationTree<LoginState> = {
  setNameData: (state: LoginState, payload: PostData['name']) => {
    state.postData.name = payload
  },
  setPasswordData: (state: LoginState, payload: PostData['password']) => {
    state.postData.password = payload
  },
  setTokenData: (state: LoginState, payload: PostData['token']) => {
    state.postData.token = payload
  }
}
/* 上記までがmodule mode 対応。 */

/* module modeの場合は不要の為コメントアウト */
/* export const login: Module<LoginState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
} */
