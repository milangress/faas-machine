<template>
  <span v-on:click="animateNewSentence" class="sentence-part">
    {{newSentenceArray[0]}}
  </span>
</template>

<script>
const emitter = require('tiny-emitter/instance')

export default {
  name: 'SentencePart',
  props: {
    sentencesArray: Array
  },
  data: function () {
    return {
      newSentenceArray: this.sentencesArray
    }
  },
  created () {
    emitter.on('newSentence', (data) => {
      this.animateNewSentence()
    })
  },
  methods: {
    animateNewSentence: function () {
      const that = this
      const mainLoopId = setInterval(function () {
        that.randomizeSlotData()
      }, 3)
      window.setTimeout(() => {
        clearInterval(mainLoopId)
      }, 500)
    },
    randomizeSlotData: function () {
      this.newSentenceArray = this.shuffleArray(this.sentencesArray)
    },
    shuffleArray: function (arrParam) {
      const arr = arrParam.slice()
      let length = arr.length
      let temp
      let i
      while (length) {
        i = Math.floor(Math.random() * length--)
        temp = arr[length]
        arr[length] = arr[i]
        arr[i] = temp
      }
      return arr
    }
  }
}
</script>

<style scoped lang="stylus">
.sentence-part:hover
  //color blue
  color: white
  text-stroke 0.01px black
  -webkit-text-stroke: 0.01px black;
  //text-shadow 0px 0px 3px black
</style>
