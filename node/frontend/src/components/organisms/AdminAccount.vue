<template>
  <div>
    <v-row class="admin-account__row-message">
      <v-col cols="12" sm="12" md="12" lg="12">
        <MessageCard />
      </v-col>
    </v-row>
    <v-row class="admin-account__row-message">
      <v-col cols="12" sm="6" md="6" lg="6">
        <MessageCard :board-color="'deep-purple lighten-2'" />
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6">
        <MessageCard :board-color="'cyan lighten-1'" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MessageCard from '@/components/molecules/MessageCard.vue'
import cnf from '~/config/config.json'
import client from '~/client'

@Component({
  components: {
    MessageCard
  }
})
export default class AdminAccount extends Vue {
  public graphXAxis: object = cnf.graphTimeXAxis
  public sampleData: object = cnf.graphSampleValue
  public lineColor: string = cnf.defaultLineColor
  public sheetColor: string = cnf.defaultSheetColor

  public created() {
    client
      .get(cnf.PATH_ADMIN_ACCOUNT)
      .then((response) => {
        console.log('axios get: ' + JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log('axios get error: ' + error)
      })
  }
}
</script>
