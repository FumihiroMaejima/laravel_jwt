<template>
  <v-overlay :value="open">
    <v-progress-circular
      :indeterminate="open"
      :size="size"
      :color="color"
    ></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
  @Prop({ default: 'grey lighten-3' })
  private color?: string

  @Prop({ default: false })
  private open?: boolean

  @Prop({ default: 64 })
  private size?: number
}
</script>
