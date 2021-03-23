<template lang="pug">
div.wrapper
  h2 Google Sheet: &nbsp;
    |
    a(:href="externalSheetURL") {{sheetID}}
  div(v-for="subSheet in numberOfSubSheets")
    router-link.button(:to="makePath(subSheet.id)") {{subSheet.title}}
      br
      br
      | {{subSheet.headers}}
    // router-link.button(:to="{ name: 'user', params: { gid: sheetID}}") Make new Sentence…
    // router-link.button(:to="{ name: 'user', params: { gid: sheetID, sheet: subSheet}}") Make new Sentence…
    // p {{sheetID}}
    // hr
    // a {{externalSheetURL}}
    // br
    // a {{externalSheetJSONUrl}}
</template>

<script>
export default {
  name: 'sheetPreviewOverview',
  props: {
    sheetID: String
  },
  data: function () {
    return {
      numberOfSubSheets: []
    }
  },
  mounted () {
    this.loadAvailableSubSheets()
  },
  methods: {
    makePath: function (subSheet) {
      return `/gen/${this.sheetID}/${subSheet}`
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
.button
  margin-bottom 1rem
  text-decoration none
.button:visited
  color initial
</style>
