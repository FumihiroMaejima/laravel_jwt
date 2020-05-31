<template>
  <v-app>
    <v-content>
      <Loading :open="isLoginProcess" />
      <Login @loginEvent="changeOpenFlag" />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Loading from '~/components/atoms/Loading.vue'
import Login from '~/components/organisms/Login.vue'


@Component({
  components: {
    Loading,
    Login
  }
})
export default class LoginPage extends Vue {
  private openLoading = false

  // computed
  public get isLoginProcess(): boolean {
    return this.openLoading
  }
  // methods
  changeOpenFlag(value: boolean): boolean {
    return this.openLoading = value
  }
}
</script>
