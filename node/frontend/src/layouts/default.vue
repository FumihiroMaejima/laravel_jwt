<template>
  <v-app>
    <Loading :open="isLoginProcess" />
    <SnackBar ref="toast" text="Logout Failured!" color="red" />
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
import SnackBar from '~/components/atoms/SnackBar.vue'
import AuthGlobalHeader from '~/components/_global/AuthGlobalHeader.vue'
import '~/assets/scss/App.scss'

const AuthModule = namespace('module/auth')

@Component({
  components: {
    GlobalFooter,
    GlobalHeader,
    Loading,
    SnackBar,
    AuthGlobalHeader
  }
})
export default class App extends Vue {
  $refs!: {
    toast: SnackBar
  }

  private openLoading = false

  @AuthModule.Getter('id')
  private id!: number

  @AuthModule.Getter('name')
  private name!: string

  @AuthModule.Getter('token')
  private token!: string

  @AuthModule.Getter('authority')
  private authority!: string

  @AuthModule.Action('getAuthData')
  private getAuthData!: (payload: object) => {}

  @AuthModule.Action('refreshAuthData')
  private refreshAuthData!: () => {}

  // computed
  public get isLoginProcess(): boolean {
    return this.openLoading
  }

  public get UserId(): number {
    return this.id
  }

  created() {
    // this.$myInjectedFunction('works in created' + this.$store.state.module.auth)

    this.$base.authInstance(this.id, this.token).then((response) => {
      this.getAuthData(response)

      if (!this.token) {
        this.refreshAuthData()
        if (this.$route.path !== '/') {
          this.$router.push('/')
        }
      }
      /* else if (this.id) {

      } */
    })
  }

  // methods
  changeLoadingFlag(value: boolean) {
    this.openLoading = value
  }

  openErrorToast(value: boolean) {
    this.$refs.toast.open = value
  }
}
</script>
