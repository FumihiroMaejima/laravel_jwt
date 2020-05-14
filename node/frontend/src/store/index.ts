/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '~/store/types'
/* module modeの場合は不要の為コメントアウト */
// import { login } from '~/store/modules/login/'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV !== 'production',
  state: {
    version: '1.0.0'
  },
  modules: {
    /* module modeの場合は不要の為コメントアウト */
    // login
  },
  mutations: {},
  actions: {}
}

// classic mode.
// const storeInstatnce = () => new Vuex.Store<RootState>(store)
// export default storeInstatnce
