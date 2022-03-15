<template lang="pug">
.iframeWrapper
  iframe(src="https://docs.google.com/spreadsheets/d/1AdYfrX9OpILVz37kP6lV-1rWIInUhMu9qCwkFCQC69k/#gid=1964514638?usp=sharing&amp;widget=true&amp;headers=true&amp;chrome=true&amp;rm=minimal&amp;single=true")
</template>

<script>
export default {
  name: 'EditGoogleSheetIFrame'
}
</script>

<style scoped lang="stylus">
.iframeWrapper
  width: 100%
  iframe
    width: 100%
    min-height: 80vh
    border: 3px solid blue
</style>
