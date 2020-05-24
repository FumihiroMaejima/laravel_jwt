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

const LoginModule = namespace('modules/login')

@Component
export default class Login extends Vue {
  private showPassword = false

  @LoginModule.State('LoginState')
  private postData!: {
    name: PostData['name']
    password: PostData['password']
    token: PostData['token']
  }

  @LoginModule.Getter('name')
  private name!: string

  @LoginModule.Getter('password')
  private password!: string

  @LoginModule.Getter('token')
  private token!: string

  @LoginModule.Action('getNameDataAction')
  private getNameDataAction!: (payload: PostData['name']) => {}

  @LoginModule.Action('getPasswordDataAction')
  private getPasswordDataAction!: (payload: PostData['password']) => {}

  @LoginModule.Action('getTokenDataAction')
  private getTokenDataAction!: (payload: PostData['token']) => {}

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

  // created
  public created() {
    const self = this
    function getToken() {
      const stringValue = cnf.targetString
      let randomString: string = ''
      if (process.browser) {
        randomString = Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map((num: any) => stringValue[num % stringValue.length])
          .join('')
      } else {
        // SSR対応
        randomString = Array.from(Array(16))
          .map(
            () => stringValue[Math.floor(Math.random() * stringValue.length)]
          )
          .join('')
      }
      self.getTokenDataAction(randomString)
    }
    async function LoginFunction() {
      await client
        .get(cnf.API_PATH_USERS_USER)
        .then((response) => {
          console.log('axios get responce: ' + JSON.stringify(response.data))
        })
        .catch((error) => {
          console.log('axios get error: ' + error)
        })
    }
    return [getToken(), /* LoginFunction() */]
  }

  // methods
  getName() {
    return this.name
  }

  getPassword() {
    return this.password
  }

  async LoginFunction() {
    await client
      .post(cnf.PATH_AUTH_LOGIN, this.$store.state.modules.login.postData)
      .then((response) => {
        console.log(
          'axios post data: ' +
            JSON.stringify(this.$store.state.modules.login.postData)
        )
        console.log('axios post responce: ' + JSON.stringify(response.data))
        this.$router.push('/admin')
      })
      .catch((error) => {
        console.log('axios post error: ' + error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
