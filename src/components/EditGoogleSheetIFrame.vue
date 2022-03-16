<template lang="pug">
.iframeWrapper
  iframe(:src="`https://docs.google.com/spreadsheets/d/${sheetID}/#gid=${gid}?usp=sharing&amp;widget=true&amp;headers=true&amp;chrome=true&amp;rm=minimal&amp;single=true`")
</template>

<script>
export default {
  name: 'EditGoogleSheetIFrame',
  props: {
    sheetID: {
      required: true,
      type: String,
      default: '1AdYfrX9OpILVz37kP6lV-1rWIInUhMu9qCwkFCQC69k'
    },
    gid: {
      type: String,
      default: '1'
    }
  }
}
</script>

<style scoped lang="stylus">
.iframeWrapper
  width: 100%
  iframe
    width: 100%
    min-height: 50vh
    border: 3px solid blue
</style>
