<template>
  <div id="app">
    <div class="bg" :style="{backgroundImage:'url('+require('./assets/bg2.jpg')+')'}"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less" >
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #eee;
  margin: 0;
  padding: 0;
}
*{
  box-sizing: border-box;
}
.bg{
  position: fixed;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-repeat: no-repeat;
  background-color: #666;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
