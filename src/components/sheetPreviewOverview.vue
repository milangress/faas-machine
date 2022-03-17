<template lang="pug">
section.wrapper
  //h2 {{sheetJson.properties.title}}
  termplate(v-if="!loading" )
    h2 {{sheetJson.properties.title}} &nbsp;
      |
      a(:href="externalSheetURL") {{sheetID}}
  div(v-for="subSheet in numberOfSubSheets")
    SheetPreviewItem(:sheetID="sheetID" :subSheet="subSheet")
      //br
      //br
      //| {{subSheet.title}}
  pulse-loader(:loading="loading" color="blue" :size="size")
    // router-link.button(:to="{ name: 'user', params: { gid: sheetID}}") Make new Sentence…
    // router-link.button(:to="{ name: 'user', params: { gid: sheetID, sheet: subSheet}}") Make new Sentence…
    // p {{sheetID}}
    // hr
    // a {{externalSheetURL}}
    // br
    // a {{externalSheetJSONUrl}}
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import SheetPreviewItem from '@/components/SheetPreviewItem'

export default {
  name: 'sheetPreviewOverview',
  components: { SheetPreviewItem, PulseLoader },
  props: {
    sheetID: String
  },
  data: function () {
    return {
      numberOfSubSheets: [],
      loading: true,
      sheetJson: {}
    }
  },
  mounted () {
    this.getSubSheets()
    // this.loadAvailableSubSheets()
  },
  methods: {
    getSubSheets: async function () {
      const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetID}?key=AIzaSyAV03L19A5_7wkchjcLIZFqErntE09gMrc`
      const getResults = await fetch(sheetUrl).then(response => response.json())
      console.log(getResults)
      getResults.sheets.forEach((sheet) => {
        this.numberOfSubSheets.push({
          id: sheet.properties.sheetId,
          title: sheet.properties.title
        })
      })
      this.sheetJson = getResults
      window.setTimeout(this.endLoading, 1000)
    },
    endLoading: function () {
      this.loading = false
    },
    loadAvailableSubSheets: async function (subSheetId = 1) {
      const sheetURL = this.externalSheetJsonUrl(this.sheetID, subSheetId)
      const getResults = await fetch(sheetURL)
      if (getResults.status === 200) {
        const sheetData = await fetch(sheetURL).then(response => response.json())
        const title = sheetData.feed.title.$t
        const headers = sheetData.feed.entry.filter(entry => entry.gs$cell.row === '2')
        const headersContent = headers.map(entry => entry.gs$cell.$t)
        this.numberOfSubSheets.push({
          id: subSheetId,
          title: title,
          headers: headersContent.join(' ')
        })
        await this.loadAvailableSubSheets(subSheetId + 1)
      } else {
        this.loading = false
      }
    },
    externalSheetJsonUrl: function (sheetID, subSheetID = 1) {
      return `https://spreadsheets.google.com/feeds/cells/${sheetID}/${subSheetID}/public/full?alt=json`
    }
  },
  computed: {
    internalPathToSheet: function () {
      return `/gen/${this.sheetID}`
    },
    externalSheetURL: function () {
      return `https://docs.google.com/spreadsheets/d/${this.sheetID}/edit#gid=0`
    },
    externalSheetJSONUrl: function () {
      return `https://spreadsheets.google.com/feeds/cells/${this.sheetID}/1/public/full?alt=json`
    }
  }
}
</script>

<style lang="stylus" scoped>
h2
  text-align left
  overflow-wrap: break-word;
.wrapper
  margin-top 4rem
</style>
