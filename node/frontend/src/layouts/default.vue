<template>
  <v-app>
    <Loading :open="LoadingProcess" />
    <Toast
      :open="isLogoutError"
      text="Logout Failured!"
      color="red"
      @closeToastEvent="closeErrorToast"
    />
    <AuthGlobalHeader
      v-if="UserId"
      @logoutEvent="changeLoadingFlag"
      @logoutErrorEvent="openErrorToast"
    />
    <GlobalHeader v-else />
    <v-content>
      <nuxt />
    </v-content>
    <GlobalFooter />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import GlobalFooter from '~/components/_global/GlobalFooter.vue'
import GlobalHeader from '@/components/_global/GlobalHeader.vue'
import Loading from '~/components/atoms/Loading.vue'
import Toast from '~/components/atoms/Toast.vue'
import AuthGlobalHeader from '~/components/_global/AuthGlobalHeader.vue'
import cnf from '~/config/config.json'
import '~/assets/scss/App.scss'

const AuthModule = namespace('module/auth')

@Component({
  components: {
    GlobalFooter,
    GlobalHeader,
    Loading,
    Toast,
    AuthGlobalHeader
  }
})
export default class App extends Vue {
  private openLoading = false
  private isLogoutError = false

  @AuthModule.Getter('id')
  private id!: number

  @AuthModule.Getter('name')
  private name!: string

  @AuthModule.Getter('authority')
  private authority!: string

  @AuthModule.Action('getAuthData')
  private getAuthData!: (payload: object) => {}

  @AuthModule.Action('refreshAuthData')
  private refreshAuthData!: () => {}

  // computed
  public get LoadingProcess(): boolean {
    return this.openLoading
  }

  public get UserId(): number {
    return this.id
  }

  created() {
    this.openLoading = true
    const token: any = this.$cookies.get(cnf.tokenStoreName)

    if (token === undefined) {
      this.resetAction()
    }

    this.$base.authInstance(this.id, token).then((response) => {
      this.getAuthData(response)

      if (!response.id) {
        this.resetAction(true)
      } else if (this.$route.path === '/') {
        // 認証情報がある、かつログイン画面にアクセスした時
        this.$router.push('/admin')
      }
      this.openLoading = false
    })
  }

  // methods
  changeLoadingFlag(value: boolean) {
    this.openLoading = value
  }

  openErrorToast(value: boolean) {
    this.isLogoutError = value
  }

  closeErrorToast(value: boolean) {
    this.isLogoutError = value
  }

  resetAction(resetCookie = false) {
    if (resetCookie) {
      this.$cookies.remove(cnf.tokenStoreName)
    }

    this.refreshAuthData()
    if (this.$route.path !== '/') {
      this.$router.push('/')
    }
  }
}
</script>
