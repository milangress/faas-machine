<template lang="pug">
div(class="home")
  //EditGoogleSheetIFrame
  div(v-for="sheetID in availableSheetIDs")
    sheet-preview-overview(:sheetID="sheetID")
  // input(type="text")
</template>

<script>
// @ is an alias to /src
import sheetPreviewOverview from '@/components/sheetPreviewOverview'
import EditGoogleSheetIFrame from '@/components/EditGoogleSheetIFrame'

export default {
  name: 'Home',
  components: {
    EditGoogleSheetIFrame,
    sheetPreviewOverview
  },
  data: function () {
    return {
      availableSheetIDs: ['1MuXLBM_WGHm9vS_jhAtDVKHGDK9FJ171fpkqwBXJIKU', '1AdYfrX9OpILVz37kP6lV-1rWIInUhMu9qCwkFCQC69k']
    }
  }
}
</script>

<style lang="stylus">
.button
  display block
  padding 0.5rem
  font-size 2vw
  border 3px solid blue
  cursor pointer
.button:hover
  border 3px solid white
  background blue
  color white
</style>
