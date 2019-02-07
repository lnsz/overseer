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

  #app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  // Global Styles
  // Elements
  body {
    margin: 0;
  }

  // Pseudo Elements
  ::selection {
    background: color('green');
    color: color('text');
  }
  ::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
  }

  // States
  :focus {
    outline: none;
  }

  // Transitions
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
