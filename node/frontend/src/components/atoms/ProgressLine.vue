<template>
  <v-overlay :value="open">
    <v-progress-linear
      :indeterminate="open"
      :color="color"
      :value="value"
      :fixed="fixed"
    ></v-progress-linear>
  </v-overlay>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ProgressLine extends Vue {
  @Prop({ default: 'grey lighten-3' })
  private color?: string

  @Prop({ default: false })
  private open?: boolean

  @Prop({ default: 0 })
  private value?: number

  @Prop({ default: true })
  private fixed?: boolean
}
</script>
