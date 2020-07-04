/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '~/store/types'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV !== 'production',
  state: {
    version: '1.0.0'
  },
  modules: {},
  mutations: {},
  actions: {}
}
