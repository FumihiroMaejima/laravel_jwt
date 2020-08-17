<template>
  <div class="admin-page__row">
    <Toast
      :open="openToast"
      text="Login Sucessed!"
      @closeToastEvent="closeToast"
    />
    <Admin />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Toast from '~/components/atoms/Toast.vue'
import Admin from '~/components/organisms/Admin.vue'
import cnf from '~/config/config.json'

@Component({
  components: {
    Toast,
    Admin
  }
})
export default class AdminPage extends Vue {
  private openToast: boolean = false

  // mounted
  mounted() {
    const obj = sessionStorage
    if (
      obj &&
      Object.prototype.hasOwnProperty.call(obj, cnf.loginSessionName)
    ) {
      sessionStorage.removeItem(cnf.loginSessionName)
      this.openToast = true
    }
  }

  closeToast(value: boolean) {
    this.openToast = value
  }
}
</script>
