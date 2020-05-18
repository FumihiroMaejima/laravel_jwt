<template>
  <v-app dark>
    <!-- <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1> -->
    <component :is="currentComponent" v-if="error.statusCode === 404" />
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      back Home
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import NotFoundPage from '~/components/templates/NotFoundPage.vue'

@Component({
  components: {
    NotFoundPage
  }
})
export default class empty extends Vue {
  // data
  public pageNotFound: string = '404 Not Found'
  public otherError: string = 'An error occurred'
  private componentName: string = 'NotFoundPage'

  // props
  @Prop({})
  private error!: any

  // computed
  public get currentComponent() {
    return this.componentName
  }

  // methods
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
