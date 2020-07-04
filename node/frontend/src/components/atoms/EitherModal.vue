<template>
  <v-dialog v-model="dialog" persistent :max-width="width">
    <template v-slot:activator="{ on }">
      <slot name="button" v-on="on"></slot>
    </template>
    <v-card>
      <v-card-title class="headline">{{ headerText }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="either-modal__text">
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="open = false">No</v-btn>
        <v-btn color="green darken-1" text @click="action">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class EitherModal extends Vue {
  // data
  public open: boolean = false

  @Prop({ default: 'add Header Text.' })
  private headerText?: string

  @Prop({ default: 'add detail text.' })
  private text?: string

  @Prop({ default: '60%' })
  private width?: string

  @Prop({
    default: (): void => {}
  })
  private action?: () => void

  public get dialog(): boolean {
    return this.open
  }

  public set dialog(value: boolean) {
    this.open = value
  }
}
</script>
