<template>
  <header>
    <v-navigation-drawer v-model="open" dark app>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2">
              Side Bar
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-group
            v-for="list in navigationLists"
            :key="list.name"
            :prepend-icon="list.icon"
            no-action
            :append-icon="list.subLists ? undefined : ''"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ list.name }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="subList in list.subLists"
              :key="subList.name"
              :to="subList.link"
            >
              <v-list-item-content>
                <v-list-item-title>{{ subList.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>

        <div>
          <EitherModal
            ref="modal"
            header-text="ログアウト確認"
            width="40%"
            text="ログアウトします。よろしいですか？"
            :action="LogoutFunction"
          >
            <template v-slot:button>
              <v-btn block @click="openModal">Logout</v-btn>
            </template>
          </EitherModal>
        </div>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar dark app>
      <v-app-bar-nav-icon @click="open = !open"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ headerTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-badge color="pink" content="2" overlap
          ><v-icon>mdi-bell</v-icon></v-badge
        >
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-subheader>Account Menu</v-subheader>
          <v-list-item
            v-for="menuList in accountMenuList"
            :key="menuList.name"
            :to="menuList.link"
          >
            <v-icon color="blue-grey lighten-1">{{ menuList.icon }}</v-icon>
            <v-list-item-content>
              <v-list-item-title>{{ menuList.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </header>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import EitherModal from '~/components/atoms/EitherModal.vue'
import client from '~/client'
import authCnf from '~/config/authGlobal.json'
import cnf from '~/config/config.json'

const AuthModule = namespace('subModules/auth')

@Component({
  components: {
    EitherModal
  }
})
export default class AuthGlobalHeader extends Vue {
  $refs!: {
    modal: EitherModal
  }

  @AuthModule.Getter('id')
  private id!: number

  @AuthModule.Action('refreshAuthData')
  private refreshAuthData!: () => {}

  public accountMenuList: object = authCnf.accountMenuList
  public headerTitle: string =
    process.env.VUE_APP_HEADER_TITLE || 'ADMIN HEADER'

  public open = false
  public navigationLists: object = authCnf.navigationLists

  @Emit('logoutEvent')
  public logoutEventTrigger(execution: boolean) {
    return execution
  }

  @Emit('logoutErrorEvent')
  public logoutErrorEventTrigger(isError: boolean) {
    return isError
  }

  openModal() {
    this.$refs.modal.open = true
  }

  async LogoutFunction() {
    this.logoutEventTrigger(true)
    this.$refs.modal.open = false
    await client
      .post(
        cnf.PATH_AUTH_LOGOUT,
        {},
        {
          headers: this.$base.addHeaders({
            id: this.id,
            token: this.$cookies.get(cnf.tokenStoreName)
          })
        }
      )
      .then(() => {
        this.logoutEventTrigger(false)
        this.$cookies.remove(cnf.tokenStoreName)
        this.refreshAuthData()
        this.$router.push('/')
      })
      .catch((error) => {
        console.error('axios post error: ' + error)
        this.logoutEventTrigger(false)
        this.logoutErrorEventTrigger(true)
      })
  }
}
</script>
