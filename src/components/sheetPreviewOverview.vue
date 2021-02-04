<template lang="pug">
  div.wrapper
    router-link.button(:to="internalPathToSheet") Make new Sentence…
    p {{sheetID}}
    a {{externalSheetURL}}
    br
    a {{externalSheetJSONUrl}}
</template>

<script>
export default {
  name: 'sheetPreviewOverview',
  props: {
    sheetID: String
  },
  data: function () {
    return {
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

<style scoped>

</style>
