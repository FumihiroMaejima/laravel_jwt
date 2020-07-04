<template>
  <header>
    <v-app-bar dark app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>{{ headerTitle }}</v-toolbar-title>
    </v-app-bar>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class GlobalHeader extends Vue {
  public headerTitle: string =
    process.env.VUE_APP_HEADER_TITLE || 'ADMIN HEADER'
}
</script>
