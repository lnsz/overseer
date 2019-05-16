<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "shared/styles/functions.scss";
body {
  margin: 0px;
  min-height: 100vh;
  background: bgColor('default');
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  @import url('https://fonts.googleapis.com/css?family=Open+Sans|Roboto:300,400,500');
  @import "shared/styles/functions";

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
  a, a:visited, a:hover, a:active, a:focus {
    text-decoration: none;
  }

  // Pseudo Elements
  ::selection {
    background: bgColor('primary');
    color: textColor('default');
  }
  ::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance:textfield; /* Firefox */
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
