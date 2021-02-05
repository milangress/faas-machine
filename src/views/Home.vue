<template lang="pug">
div(class="home")
  div(v-for="sheetID in availableSheetIDs")
    sheet-preview-overview(:sheetID="sheetID")
  input(type="text")
</template>

<script>
// @ is an alias to /src
import sheetPreviewOverview from '@/components/sheetPreviewOverview'

export default {
  name: 'Home',
  components: {
    sheetPreviewOverview
  },
  data: function () {
    return {
      availableSheetIDs: ['1MuXLBM_WGHm9vS_jhAtDVKHGDK9FJ171fpkqwBXJIKU', '2TestLink']
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
