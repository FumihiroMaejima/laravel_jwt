<template>
  <v-app>
    <Loading :open="isLoginProcess" />
    <!-- <GlobalHeader/> -->
    <AuthGlobalHeader @logoutEvent="changeLoadingFlag" />
    <v-content>
      <nuxt />
    </v-content>
    <GlobalFooter />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import GlobalFooter from '~/components/_global/GlobalFooter.vue'
// import GlobalHeader from '@/components/_global/GlobalHeader.vue'
import Loading from '~/components/atoms/Loading.vue'
import AuthGlobalHeader from '~/components/_global/AuthGlobalHeader.vue'
import '~/assets/scss/App.scss'

@Component({
  components: {
    GlobalFooter,
    Loading,
    AuthGlobalHeader
  }
})
export default class App extends Vue {
  private openLoading = false

  // computed
  public get isLoginProcess(): boolean {
    return this.openLoading
  }

  // methods
  changeLoadingFlag(value: boolean) {
    this.openLoading = value
  }
}
</script>
