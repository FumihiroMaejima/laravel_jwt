<template>
  <v-card class="mx-auto mt-5" width="400px">
    <v-card-title class="grey darken-4 white--text">
      <h1 class="subtitle-1">ログインフォーム</h1>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="nameData"
          prepend-icon="mdi-account-circle"
          label="ユーザ名"
          :rules="nameRules"
        />
        <v-text-field
          v-model="passwordData"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          prepend-icon="mdi-lock"
          label="パスワード"
          :rules="passRule"
          @click:append="showPassword = !showPassword"
        />
        <v-card-actions>
          <v-spacer />
          <v-btn class="info" @click="LoginFunction">ログイン</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Emit, Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import { PostData } from '~/store/types'
import client from '~/client'
import cnf from '~/config/config.json'

const AuthModule = namespace('subModules/auth')
const LoginModule = namespace('modules/login')

@Component
export default class Login extends Vue {
  $refs!: {
    form: any
  }

  private valid: boolean = true
  private nameRules: any = [
    (v: any) => !!v || '入力してください。',
    (v: any) => this.checkWhiteSpace(v) || '1文字以上入力してください。',
    (v: any) => (v && v.length <= 10) || '10文字以内で入力してください。'
  ]

  private passRule: any = [
    (v: any) => !!v || '入力してください。',
    (v: any) => this.checkWhiteSpace(v) || '1文字以上入力してください。'
  ]

  private showPassword: boolean = false

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

  @Emit('loginEvent')
  public loginEventTrigger(execution: boolean) {
    return execution
  }

  @Emit('loginErrorEvent')
  public loginErrorEventTrigger(isError: boolean) {
    return isError
  }

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
    this.loginEventTrigger(false)
  }

  async LoginFunction() {
    if (!this.$refs.form.validate()) {
      return
    }

    this.loginEventTrigger(true)
    await client
      .post(cnf.PATH_AUTH_LOGIN, this.$store.state.modules.login.postData)
      .then((response) => {
        const data = response.data
        this.getAuthData({
          id: data.user.id,
          name: data.user.name
        })
        this.$cookies.set(cnf.tokenStoreName, data.access_token)
        sessionStorage.setItem(cnf.loginSessionName, 'true')

        this.finishPostAction()
        this.$router.push('/admin')
      })
      .catch((error) => {
        console.error('axios post error: ' + error)
        this.finishPostAction()
        this.loginErrorEventTrigger(true)
      })
  }

  checkWhiteSpace(value: string) {
    return value.trim().length > 0
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
