<template>
  <v-snackbar
    :value="open"
    :color="color"
    :timeout="time"
    :top="top"
    :right="right"
    @input="checkIsActive"
  >
    {{ text }}
    <v-btn :color="buttonColor" text @click="closeToast">Close</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Toast extends Vue {
  // data
  // private isActive: boolean = false

  @Prop({ default: true })
  private open!: boolean

  @Prop({ default: 'green' })
  private color?: string

  @Prop({ default: 'a snackbar component' })
  private text?: string

  @Prop({ default: 'grey lighten-4' })
  private buttonColor?: string

  @Prop({ default: 5000 })
  private time?: number

  @Prop({ default: true })
  private top?: boolean

  @Prop({ default: true })
  private right?: boolean

  @Emit('closeToastEvent')
  public closeToastEventTrigger(open: boolean) {
    return open
  }

  closeToast() {
    this.closeToastEventTrigger(false)
  }

  checkIsActive(isActive: boolean) {
    // 時間制限でトーストが閉じられた時に親コンポーネントのデータも更新する
    if (!isActive) {
      this.closeToast()
    }
  }
}
</script>
