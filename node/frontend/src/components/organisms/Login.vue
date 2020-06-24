<template>
  <v-card class="mx-auto mt-5" width="400px">
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="nameData"
          prepend-icon="mdi-account-circle"
          label="ユーザ名"
        />
        <v-text-field
          v-model="passwordData"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          prepend-icon="mdi-lock"
          label="パスワード"
          @click:append="showPassword = !showPassword"
        />
        <v-card-actions>
          <v-btn class="info" @click="LoginFunction">ログイン</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import { PostData } from '~/store/types'
import client from '~/client'
import cnf from '~/config/config.json'

const AuthModule = namespace('module/auth')
const LoginModule = namespace('modules/login')

@Component
export default class Login extends Vue {
  private showPassword = false

  @LoginModule.State('LoginState')
  private postData!: {
    name: PostData['name']
    password: PostData['password']
  }

  @LoginModule.Getter('name')
  private name!: string

  @LoginModule.Getter('password')
  private password!: string

  @LoginModule.Action('getNameDataAction')
  private getNameDataAction!: (payload: PostData['name']) => {}

  @LoginModule.Action('getPasswordDataAction')
  private getPasswordDataAction!: (payload: PostData['password']) => {}

  @LoginModule.Action('refreshLoginPostAction')
  private refreshLoginPostAction!: () => {}

  @AuthModule.Action('getAuthData')
  private getAuthData!: (payload: object) => {}

  // computed
  public get nameData(): string {
    return this.name
  }

  public set nameData(getName: string) {
    this.getNameDataAction(getName)
  }

  public get passwordData(): string {
    return this.password
  }

  public set passwordData(getPassword: string) {
    this.getPasswordDataAction(getPassword)
  }

  // methods
  getName() {
    return this.name
  }

  getPassword() {
    return this.password
  }

  finishPostAction() {
    this.refreshLoginPostAction()
    this.$emit('loginEvent', false)
  }

  async LoginFunction() {
    this.$emit('loginEvent', true)
    await client
      .post(cnf.PATH_AUTH_LOGIN, this.$store.state.modules.login.postData)
      .then((response) => {
        console.log(
          'axios post data: ' +
            JSON.stringify(this.$store.state.modules.login.postData)
        )
        console.log('axios post response: ' + JSON.stringify(response.data))
        const data = response.data
        this.getAuthData({
          id: data.user.id,
          name: data.user.name
        })
        this.$cookies.set(cnf.tokenStoreName, data.access_token)

        this.finishPostAction()
        this.$router.push('/admin')
      })
      .catch((error) => {
        console.error('axios post error: ' + error)
        this.finishPostAction()
        this.$emit('loginErrorEvent', true)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
