<template lang="pug">
#app
  SVGGrainTest
  #nav
    // router-link(to='/') Home
    // router-link(to='/gen/1MuXLBM_WGHm9vS_jhAtDVKHGDK9FJ171fpkqwBXJIKU') Gen
  router-view
</template>

<style lang="stylus">
@font-face {
  font-family: 'oracle';
  src: url('/fonts/oraclegm-regularmono-webfont-webfont.woff2') format('woff2'),
    url('/fonts/oraclegm-regularmono-webfont-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Garamondt';
  src: url('/fonts/Garamondt-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Garamondt';
  src: url('/fonts/Garamondt-Italic.woff') format('woff');
  font-weight: normal;
  font-style: italic;
}

#app {
  font-family: oracle, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000 margin-top 60px;
}
</style>
<script>
import SVGGrainTest from '@/components/SVGGrainTest'
export default {
  components: { SVGGrainTest }
}
</script>
