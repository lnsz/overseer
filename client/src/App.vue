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
</style>
