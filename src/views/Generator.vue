<template lang="pug">
div(class="home")
  div.button(v-on:click="changeWholeSentence") Make new Sentence…
  // h1(v-on:click="animateNewSentence") {{currentSentence}}
  h1.Sentence
    span(v-for='slot in slotData')
      SentencePart(:sentencesArray="slot" :bus="bus")
  // ul
    li(v-for="slot in slotData[0]") {{slot}}
  // div
    hr
    h3 Debug info
    p Google Sheet Gid: {{ $route.params.gid }}
    p JSON endpoint:
      |
      a(:href="sheetURL") {{sheetURL}}
    p Edit Google Sheet:
      |
      a(:href="sheetUrlEditable") {{sheetUrlEditable}}
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SentencePart from '@/components/SentencePart'

const emitter = require('tiny-emitter/instance')

export default {
  name: 'Home',
  components: {
    HelloWorld,
    SentencePart
  },
  data: function () {
    return {
      sheetURL: `https://spreadsheets.google.com/feeds/cells/${this.$route.params.gid}/1/public/full?alt=json`,
      sheetUrlEditable: `https://docs.google.com/spreadsheets/d/${this.$route.params.gid}/edit#gid=0`,
      slotData: [['Loading', '…'], ['…', 'Loading']]
    }
  },
  mounted () {
    this.loadSheet()
  },
  methods: {
    changeWholeSentence: function () {
      emitter.emit('newSentence')
    },
    animateNewSentence: function () {
      const that = this
      const mainLoopId = setInterval(function () {
        that.randomizeSlotData()
      }, 3)
      window.setTimeout(() => {
        clearInterval(mainLoopId)
      }, 1000)
    },
    randomizeSlotData: function () {
      this.slotData.forEach((slot, pos) => {
        this.slotData.splice(pos, 1, this.shuffleArray(slot))
      })
    },
    loadSheet: async function () {
      const sheetData = await fetch(this.sheetURL).then(response => response.json())
      const entries = sheetData.feed.entry.filter(entry => entry.gs$cell.row !== '1')
      const numberOfValidRows = [...new Set(entries.map(entry => entry.gs$cell.col))]
      numberOfValidRows.forEach((item, pos) => {
        this.slotData.splice(pos, 1, item)
      })
      this.slotData.forEach((slot, pos) => {
        const filteredSlot = entries.filter(entry => entry.gs$cell.col === slot).map(entry => entry.content.$t)
        // Using Splice so vue can detect the changes
        this.slotData.splice(pos, 1, this.shuffleArray(filteredSlot))
      })
      this.changeWholeSentence()
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
  },
  computed: {
    currentSentence: function () {
      const sentenceArray = this.slotData.map(slot => slot[0])
      return sentenceArray.join(' ')
    }
  }
}
</script>

<style lang="stylus">
.home
  margin 0 3vw
.slotPart:hover
  color blue
.button
  padding 0.5rem
  font-size 2vw
  border 3px solid blue
  cursor pointer
.button:hover
  border 3px solid white
  background blue
  color white
.Sentence
  font-size 7vw
</style>
