<template>
  <v-app>
    <v-content>
      <SnackBar text="Login Failured!" color="red" ref="toast" />
      <Loading :open="isLoginProcess" />
      <Login @loginEvent="changeLoadingFlag" @loginErrorEvent="openErrorToast" />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Loading from '~/components/atoms/Loading.vue'
import Login from '~/components/organisms/Login.vue'
import SnackBar from '~/components/atoms/SnackBar.vue'


@Component({
  components: {
    Loading,
    Login,
    SnackBar
  }
})
export default class LoginPage extends Vue {
  $refs!: {
    toast: SnackBar
  }
  private openLoading = false

  // computed
  public get isLoginProcess(): boolean {
    return this.openLoading
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
