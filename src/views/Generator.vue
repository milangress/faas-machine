<template lang="pug">
  div(class="home")
    div Gid: {{ $route.params.gid }}
    a(:href="sheetURL") {{sheetURL}}
    p {{currentSentence}}
    // ul
      li(v-for="slot in slotData[0]") {{slot}}
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data: function () {
    return {
      sheetURL: `https://spreadsheets.google.com/feeds/cells/${this.$route.params.gid}/1/public/full?alt=json`,
      slotData: ['1', '2', '3', '4', '5']
    }
  },
  mounted () {
    this.loadSheet()
  },
  methods: {
    loadSheet: async function () {
      const sheetData = await fetch(this.sheetURL).then(response => response.json())
      const entries = sheetData.feed.entry.filter(entry => entry.gs$cell.row !== '1')
      this.slotData.forEach((slot, pos) => {
        const filteredSlot = entries.filter(entry => entry.gs$cell.col === slot).map(entry => entry.content.$t)
        // Using Splice so vue can detect the changes
        this.slotData.splice(pos, 1, this.shuffleArray(filteredSlot))
      })
      console.log(this.slotData)
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
