<template>
  <v-app>
    <v-content>
      <Toast
        :open="isLoginError"
        text="Login Failured!"
        color="red"
        @closeToastEvent="closeErrorToast"
      />
      <Loading :open="isLoginProcess" />
      <Login
        @loginEvent="changeLoadingFlag"
        @loginErrorEvent="openErrorToast"
      />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Loading from '~/components/atoms/Loading.vue'
import Toast from '~/components/atoms/Toast.vue'
import Login from '~/components/organisms/Login.vue'

@Component({
  components: {
    Loading,
    Login,
    Toast
  }
})
export default class LoginPage extends Vue {
  private openLoading = false
  private isLoginError = false

  // computed
  public get isLoginProcess(): boolean {
    return this.openLoading
  }

  // methods
  changeLoadingFlag(value: boolean) {
    this.openLoading = value
  }

  openErrorToast(value: boolean) {
    this.isLoginError = value
  }

  closeErrorToast(value: boolean) {
    this.isLoginError = value
  }
}
</script>
