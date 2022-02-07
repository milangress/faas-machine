<template>
  <svg width="0" height="0" viewBox="0 0 2200 2200"
       xmlns="http://www.w3.org/2000/svg">
    <filter id="displacementFilter">
      <feTurbulence type="turbulence" baseFrequency="1.9"
                    numOctaves="2" result="turbulence"/>
      <feDisplacementMap in2="turbulence" in="SourceGraphic"
                         scale="2" xChannelSelector="R" yChannelSelector="G"/>
    </filter>

<!--    <circle cx="100" cy="100" r="100"-->
<!--            style="filter: url(#displacementFilter)"/>-->
<!--    <text  class="text" x="50" y="150" style="filter: url(#displacementFilter)">MILAN</text>-->
  </svg>
</template>

<script>
export default {
  name: 'SVGGrainTest'
}
</script>

<style scoped>
.text {
  font: bold 140px arial;
  fill: red;
}
</style>
