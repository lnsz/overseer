<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans|Roboto:300,400,500');
  @import "assets/styles/colors";
  @import "assets/styles/functions";

  body {
    margin: 0;
  }

  #app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  ::selection {
    background: color('accent1');
    color: color('text');
  }

  :focus {
    outline: none;
  }
</style>
