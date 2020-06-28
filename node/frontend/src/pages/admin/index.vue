<template>
  <div class="admin-page__row">
    <SnackBar ref="toast" text="Login Sucessed!" />
    <Admin />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SnackBar from '~/components/atoms/SnackBar.vue'
import Admin from '~/components/organisms/Admin.vue'

@Component({
  components: {
    SnackBar,
    Admin
  }
})
export default class AdminPage extends Vue {
  $refs!: {
    toast: SnackBar
  }

  // mounted
  mounted() {
    const obj = sessionStorage
    if (obj && Object.prototype.hasOwnProperty.call(obj, 'loginSuccess')) {
      sessionStorage.removeItem('loginSuccess')
      this.$refs.toast.open = true
    }
  }
}
</script>
