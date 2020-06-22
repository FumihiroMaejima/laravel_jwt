import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { LoginState, RootState, PostData } from '~/store/types'

export const state = () => ({
  postData: {
    name: '',
    password: ''
  }
})

export const getters: GetterTree<LoginState, RootState> = {
  name: (state: LoginState) => state.postData.name,
  password: (state: LoginState) => state.postData.password
}

export const actions: ActionTree<LoginState, RootState> = {
  getNameDataAction: ({ commit }, payload: PostData['name']) => {
    commit('setNameData', payload)
  },
  getPasswordDataAction: ({ commit }, payload: PostData['password']) => {
    commit('setPasswordData', payload)
  },
  refreshLoginPostAction: ({ commit }) => {
    commit('setRefreshData')
  }
}

export const mutations: MutationTree<LoginState> = {
  setNameData: (state: LoginState, payload: PostData['name']) => {
    state.postData.name = payload
  },
  setPasswordData: (state: LoginState, payload: PostData['password']) => {
    state.postData.password = payload
  },
  setRefreshData: (state: LoginState) => {
    state.postData = {
      name: '',
      password: ''
    }
  }
}
