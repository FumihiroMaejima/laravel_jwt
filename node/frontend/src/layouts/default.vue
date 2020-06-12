<template>
  <v-app>
    <Loading :open="isLoginProcess" />
    <AuthGlobalHeader v-if="userID" @logoutEvent="changeLoadingFlag" />
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
import AuthGlobalHeader from '~/components/_global/AuthGlobalHeader.vue'
import '~/assets/scss/App.scss'

const AuthModule = namespace('module/auth')

@Component({
  components: {
    GlobalFooter,
    GlobalHeader,
    Loading,
    AuthGlobalHeader
  }
})
export default class App extends Vue {
  private openLoading = false

  @AuthModule.Getter('name')
  private name!: string

  @AuthModule.Getter('id')
  private id!: string

  @AuthModule.Getter('authority')
  private authority!: string

  // computed
  public get isLoginProcess(): boolean {
    return this.openLoading
  }

  public get userID(): string {
    return this.id
  }

  // methods
  changeLoadingFlag(value: boolean) {
    this.openLoading = value
  }
}
</script>
