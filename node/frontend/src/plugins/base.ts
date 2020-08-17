/* eslint-disable */
import Vue from 'vue'
// import store from 'vuex'
import router from 'vue-router'
import Authentication from '~/plugins/authentication'
import { AuthState, HeaderDataState } from '~/types'
// import cnf from '~/config/config.json'

export class Base {
  router: any
  Auth: any
  constructor(router: any) {
    this.router = router

    this.Auth = new Authentication({
      AUTH: '/auth',
      RIDIRECT: '/redirect',
      AUTHORITY: '/authority'
    })
  }

  addHeaders(data: HeaderDataState) {
    return {
      Authorization: `Bearer ${data.token ? data.token : ''}`,
      'X-Auth-ID': data.id ? data.id : ''
    }
  }

  async authInstance(id: AuthState['id'], token: HeaderDataState['token']) {
    const response = await this.Auth.getUser(this.addHeaders({id: id, token: token}))
    if (parseInt(response.status) !== 200) {
      return {
        id: null,
        name: null
      }
    } else {
      return {
        id: response.data.id,
        name: response.data.name
      }
    }
  }
}

// plugin
export default ({ app }: any, inject: any) => {
  inject('base', new Base(router))
  // inject('appCnf', cnf)
}

declare module 'vue/types/vue' {
  interface Vue {
    $base: Base
    // $myInjectedFunction(message: string): void
  }
}

// Vue.prototype.$myInjectedFunction = (message: string) => console.log(message)
