<template>
  <v-snackbar
    v-model="openData"
    :color="color"
    :timeout="time"
    :top="isTop"
    :right="isRight"
  >
    {{ text }}
    <v-btn :color="buttonColor" text @click="snackbarOpen = false">Close</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SnackBar extends Vue {
  // data
  public open: boolean = false

  @Prop({ default: 'green' })
  private color?: string

  @Prop({ default: 'a snackbar component' })
  private text?: string

  @Prop({ default: 'grey lighten-4' })
  private buttonColor?: string

  @Prop({ default: 5000 })
  private time?: number

  @Prop({ default: true })
  private isTop?: boolean

  @Prop({ default: true })
  private isRight?: boolean

  public get openData(): boolean {
    return this.open
  }

  public set openData(value: boolean) {
    this.open = value
  }
}
</script>
