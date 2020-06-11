import Vue from 'vue'
// import store from 'vuex'
import router from 'vue-router'
import Authentication from '~/plugins/authentication'

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

  addHeaders(storeData: any) {
    const data = storeData
    const ret = {
      'Authorization': `token ${data.token}`,
      'X-TOKEN-ID': data.id
    }
    console.log('add header: ' + JSON.stringify(ret, null, 2))
    return ret
  }

  async instanceAuth() {
    const data = await this.Auth.getUser()
    return data
  }
}

// plugin
export default ({ app }: any, inject: any) => {
  inject('base', new Base(router))
}

declare module 'vue/types/vue' {
  interface Vue {
    $base: Base
  }
}
