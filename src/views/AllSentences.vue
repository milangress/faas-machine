<template lang="pug">
div(class="home")
  div.main
    router-link(to="/overview") Show other FaaS Machines
    div.button(v-on:click="changeWholeSentence") Make new Sentence…
    // h1(v-on:click="animateNewSentence") {{currentSentence}}
    //.sentence_wrapper
    //  h1.Sentence(ref="sentenceEl")
    //    span(v-for='(slot, pos) in slotData')
    //      SentencePart(:sentencesArray="slot" :bus="bus" :pos:="pos")
    //      |
    //      span.wordSpace &#32;&#8203;
    div(v-for='(sentence) in allSentences')
      p(v-html="sentence.join(' ')")
      hr
  //hr
  //details
  //  summary All Sentences
  //  ul
  //    li(v-for="slot in slotData") {{slot}}

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
// import sanitizeHtml from 'sanitize-html'

// const emitter = require('tiny-emitter/instance')

export default {
  name: 'Home',
  components: {
    HelloWorld,
    SentencePart
  },
  data: function () {
    return {
      sheetURL: `https://sheets.googleapis.com/v4/spreadsheets/${this.$route.params.gid}/values/${this.$route.params.sheet}!A1:Z1001?majorDimension=COLUMNS&key=AIzaSyAV03L19A5_7wkchjcLIZFqErntE09gMrc`,
      // https://sheets.googleapis.com/v4/spreadsheets/1MuXLBM_WGHm9vS_jhAtDVKHGDK9FJ171fpkqwBXJIKU/values/BA%20FaaS%20Maschine!A1:E1001?majorDimension=COLUMNS&key=AIzaSyAV03L19A5_7wkchjcLIZFqErntE09gMrc
      sheetUrlEditable: `https://docs.google.com/spreadsheets/d/${this.$route.params.gid}/edit#gid=0`,
      slotData: [['Loading', '…'], ['…', 'Loading']],
      oldSentence: undefined
    }
  },
  mounted () {
    this.loadSheet()
  },
  methods: {
    changeWholeSentence: function () {
      this.animateNewSentence()
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
      console.table(sheetData.values)
      const maxLength = sheetData.values.reduce((acc, column) => {
        return column.length > acc ? column.length : acc
      }, 0)
      const removedHeadline = sheetData.values
        .map(column => column.slice(1))
        // fill the array if single/static entry
        .map(column => {
          if (column.length === 1) {
            return Array(maxLength - 1).fill(column[0])
          } else {
            return column
          }
        })
        // .map(column => column.filter(item => sanitizeHtml(item)))
      console.log(removedHeadline)
      this.slotData = []
      removedHeadline.forEach((column, pos) => {
        this.slotData.splice(pos, 1, this.shuffleArray(column))
      })
      this.changeWholeSentence()
      // const entries = sheetData.feed.entry.filter(entry => entry.gs$cell.row !== '1')
      // const numberOfValidRows = [...new Set(entries.map(entry => entry.gs$cell.col))]
      // numberOfValidRows.forEach((item, pos) => {
      //   this.slotData.splice(pos, 1, item)
      // })
      // this.slotData.forEach((slot, pos) => {
      //   const filteredSlot = entries.filter(entry => entry.gs$cell.col === slot).map(entry => entry.content.$t)
      //   // Using Splice so vue can detect the changes
      //   this.slotData.splice(pos, 1, this.shuffleArray(filteredSlot))
      // })
      // this.changeWholeSentence()
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
    },
    gSheetID: function () {
      const gSheetId = this.$route.params.sheetId
      // return Object.is(gSheetId, undefined) ? 1 : gSheetId
      return gSheetId
    },
    allSentences: function () {
      const maxLength = this.slotData.reduce((acc, slot) => {
        return slot.length > acc ? slot.length : acc
      }, 0)
      console.log('maxLength', maxLength)
      const allSentences = []
      for (let i = 0; i < maxLength; i++) {
        const sentence = this.slotData
          .map(slot => slot[i])
          .map(slot => slot === undefined ? '*' : slot)
        allSentences.push(sentence)
      }
      console.log(allSentences)
      return allSentences
    }
  }
}
</script>

<style lang="stylus">
.main
  min-height 100vh

.intro
  font-size 1.5vw
  max-width 70vw
  font-family 'Garamondt'
  margin-bottom 1vw
.home
  margin 0 3vw
.slotPart:hover
  color blue
.button
  padding 0.5rem
  font-size 2vw
  border 3px solid blue
  cursor pointer
  margin-block 1rem
.button:hover
  border 3px solid white
  background blue
  color white
.Sentence
  font-size: 7vw
  margin-block-start: 0
.sentence_wrapper
  filter: url(#displacementFilter)
</style>
