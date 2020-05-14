<template>
  <v-icon dark right>{{ icon }}</v-icon>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class VuetifyIcon extends Vue {
  @Prop({ default: '' })
  private icon!: string
}
</script>
