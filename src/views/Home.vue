<template lang="pug">
  div(class="home")
    router-link.button(to='/gen/1MuXLBM_WGHm9vS_jhAtDVKHGDK9FJ171fpkqwBXJIKU') Make new Sentence…
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
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
