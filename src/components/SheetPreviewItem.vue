<template lang="pug">
.sheetPreviewItem
  .itemBar
    router-link.button.openPage(:to="makePath(subSheet.title)") {{subSheet.title}}
    .button(v-on:click="editSheetOpen = !editSheetOpen") {{editSheetOpen ? 'Close' : 'Edit'}}
  template(v-if="editSheetOpen")
    .googleSheetWrapper
      .itemBar
        router-link.button.openPage(:to="makePath(subSheet.title)") {{subSheet.title}}
        .button(v-on:click="editSheetOpen = !editSheetOpen") {{editSheetOpen ? 'Close' : 'Edit'}}
      EditGoogleSheetIFrame(:sheet-i-d="sheetID" :gid="subSheet.id" )

</template>

<script>
import EditGoogleSheetIFrame from '@/components/EditGoogleSheetIFrame'
export default {
  name: 'SheetPreviewItem',
  components: { EditGoogleSheetIFrame },
  props: {
    sheetID: {
      required: true,
      type: String,
      default: '1AdYfrX9OpILVz37kP6lV-1rWIInUhMu9qCwkFCQC69k'
    },
    subSheet: {
      required: true,
      type: Object
    }
  },
  data: function () {
    return {
      editSheetOpen: false
    }
  },
  methods: {
    makePath: function (subSheet) {
      return `/gen/${this.sheetID}/${subSheet}`
    }
  }
}
</script>

<style scoped lang="stylus">
.itemBar
  display flex
  gap: 1rem
.button
  margin-bottom 1rem
  text-decoration none
.button:visited
  color blue
.button:hover
  color white
.openPage
  flex 1
.googleSheetWrapper
  position fixed
  inset 2rem
  backdrop-filter blur(10px)
  display: flex;
  flex-direction column
</style>
